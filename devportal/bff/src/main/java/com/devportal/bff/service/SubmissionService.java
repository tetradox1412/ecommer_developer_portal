package com.devportal.bff.service;

import com.devportal.bff.model.*;
import com.devportal.bff.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository repository;
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    /** Statuses that mean a (moduleName, version) slot is still "taken". */
    private static final List<String> OCCUPYING_STATUSES =
        List.of("PENDING", "COMPILING", "ACTIVE");

    public List<SubmissionDto> getSubmissionsForDeveloper(String developerId) {
        return repository.findByDeveloperIdOrderBySubmittedAtDesc(developerId)
                .stream()
                .map(SubmissionDto::from)
                .toList();
    }

    @Transactional
    public String createSubmission(String developerId, SubmitDslRequest request) {
        // Enforce version uniqueness among occupying submissions.
        // A slot is "taken" while a submission is PENDING, COMPILING, or ACTIVE.
        // ERROR/INACTIVE submissions free the slot so the version can be retried.
        // The @Transactional boundary narrows the TOCTOU window between the
        // existence check and the insert.
        if (repository.existsByModuleNameAndVersionAndStatusIn(
                request.moduleName(), request.version(), OCCUPYING_STATUSES)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                "A submission for " + request.moduleName() + " v" + request.version()
                + " already exists. Bump the version.");
        }

        String id = "SUB-" + UUID.randomUUID().toString().substring(0, 8);
        SubmissionEntity entity = SubmissionEntity.builder()
                .id(id)
                .developerId(developerId)
                .moduleName(request.moduleName())
                .version(request.version())
                .dslCode(request.dslCode())
                .dslSchema(request.dslSchema())
                .dslViews(request.dslViews())
                .manifestXml(request.manifestXml())
                .status("PENDING")
                .displayName(request.displayName())
                .longDescription(request.longDescription())
                .category(request.category())
                .industry(request.industry())
                .iconName(request.iconName())
                .tagline(request.tagline())
                .color(request.color())
                .features(request.features())
                .price(request.price())
                .changelog(request.changelog())
                .releaseNotes(request.releaseNotes())
                .build();
        repository.save(entity);
        log.info("Created submission {} for developer {}", id, developerId);
        return id;
    }

    /**
     * Version history for a module name, newest first, as lightweight DTOs.
     */
    public List<VersionInfoDto> getVersionsForModule(String developerId, String moduleName) {
        return repository.findByDeveloperIdAndModuleNameOrderBySubmittedAtDesc(developerId, moduleName)
                .stream()
                .map(VersionInfoDto::from)
                .toList();
    }

    public void registerEmitter(String submissionId, SseEmitter emitter) {
        emitters.put(submissionId, emitter);
        emitter.onCompletion(() -> emitters.remove(submissionId));
        emitter.onTimeout(() -> emitters.remove(submissionId));
        emitter.onError((e) -> emitters.remove(submissionId));
    }

    public void pushStatusEvent(String submissionId, String status, String message) {
        SseEmitter emitter = emitters.get(submissionId);
        if (emitter != null) {
            try {
                var event = Map.of(
                    "submissionId", submissionId,
                    "status", status,
                    "message", message,
                    "timestamp", java.time.Instant.now().toString()
                );
                emitter.send(SseEmitter.event().data(event));
                if ("ACTIVE".equals(status) || "ERROR".equals(status)) {
                    emitter.complete();
                }
            } catch (Exception e) {
                log.error("Failed to send SSE event for submission {}", submissionId, e);
                emitters.remove(submissionId);
            }
        }
        // Also update database
        repository.findById(submissionId).ifPresent(entity -> {
            entity.setStatus(status);
            if ("ERROR".equals(status)) entity.setErrorMessage(message);
            repository.save(entity);
        });
    }
}
