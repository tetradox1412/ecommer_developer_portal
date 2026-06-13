package com.devportal.bff.client;

import com.devportal.bff.service.SubmissionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class DslEngineClient {

    private final RestClient restClient;
    private final SubmissionService submissionService;

    public DslEngineClient(@Value("${services.dsl-engine.url}") String baseUrl,
                           SubmissionService submissionService) {
        this.restClient = RestClient.builder().baseUrl(baseUrl).build();
        this.submissionService = submissionService;
    }

    /**
     * Simulates async DSL compilation. In production, this would POST to the DSL Engine
     * and receive a callback when compilation is done.
     */
    public void submitAsync(String submissionId, String dslCode, String manifestXml) {
        // Simulate async pipeline: PENDING -> COMPILING -> ACTIVE/ERROR
        new Thread(() -> {
            try {
                Thread.sleep(1000);
                submissionService.pushStatusEvent(submissionId, "COMPILING", "DSL compilation started");
                Thread.sleep(2000);
                // Simulate success (in production, DSL Engine calls back)
                submissionService.pushStatusEvent(submissionId, "ACTIVE", "Module deployed successfully");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                submissionService.pushStatusEvent(submissionId, "ERROR", "Compilation interrupted");
            }
        }).start();
    }

    public List<Map<String, Object>> validateDsl(String dslCode) {
        // Mock validation — in production, call DSL Engine validate endpoint
        if (dslCode == null || dslCode.isBlank()) {
            return List.of(Map.of("line", 1, "message", "DSL code cannot be empty"));
        }
        return List.of(); // No errors
    }
}
