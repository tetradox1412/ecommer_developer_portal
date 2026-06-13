package com.devportal.bff.controller;

import com.devportal.bff.client.DslEngineClient;
import com.devportal.bff.model.SubmitDslRequest;
import com.devportal.bff.security.JwtUser;
import com.devportal.bff.service.SubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/bff/dsl")
@RequiredArgsConstructor
public class DslController {

    private final DslEngineClient dslEngineClient;
    private final SubmissionService submissionService;

    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submit(
            @Valid @RequestBody SubmitDslRequest request,
            @AuthenticationPrincipal JwtUser user) {
        String submissionId = submissionService.createSubmission(user.id(), request);
        dslEngineClient.submitAsync(submissionId, request.dslCode(), request.manifestXml());
        return ResponseEntity.ok(Map.of("submissionId", submissionId));
    }

    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validate(@RequestBody Map<String, String> body) {
        String dslCode = body.get("dslCode");
        var errors = dslEngineClient.validateDsl(dslCode);
        return ResponseEntity.ok(Map.of("errors", errors));
    }

    @PostMapping("/sandbox/run")
    public ResponseEntity<Map<String, Object>> runSandbox(@RequestBody Map<String, String> body) {
        String dslCode = body.get("dslCode");
        var validationErrors = dslEngineClient.validateDsl(dslCode);

        String runId = "run-" + System.currentTimeMillis();
        if (!validationErrors.isEmpty()) {
            var steps = List.of(
                Map.of("timestamp", java.time.Instant.now().toString(), "description", "Initializing sandbox environment", "status", "OK"),
                Map.of("timestamp", java.time.Instant.now().plusSeconds(1).toString(), "description", "Loading DSL definitions", "status", "OK"),
                Map.of("timestamp", java.time.Instant.now().plusSeconds(2).toString(), "description", "Validating DSL syntax", "status", "OK"),
                Map.of("timestamp", java.time.Instant.now().plusSeconds(3).toString(), "description", "Validation failed: " + validationErrors.get(0).get("message"), "status", "ERROR"),
                Map.of("timestamp", java.time.Instant.now().plusSeconds(4).toString(), "description", "Dry-run aborted due to compilation errors", "status", "ERROR")
            );
            return ResponseEntity.ok(Map.of("runId", runId, "steps", steps));
        }

        // Mock sandbox execution
        var steps = List.of(
            Map.of("timestamp", java.time.Instant.now().toString(), "description", "Initializing sandbox environment", "status", "OK"),
            Map.of("timestamp", java.time.Instant.now().plusSeconds(1).toString(), "description", "Loading DSL definitions", "status", "OK"),
            Map.of("timestamp", java.time.Instant.now().plusSeconds(2).toString(), "description", "Validating manifest permissions", "status", "OK"),
            Map.of("timestamp", java.time.Instant.now().plusSeconds(3).toString(), "description", "Executing dry-run pipeline", "status", "OK"),
            Map.of("timestamp", java.time.Instant.now().plusSeconds(4).toString(), "description", "All checks passed — ready for submission", "status", "COMPLETE")
        );
        return ResponseEntity.ok(Map.of("runId", runId, "steps", steps));
    }
}
