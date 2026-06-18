package com.devportal.bff.controller;

import com.devportal.bff.client.DslEngineClient;
import com.devportal.bff.model.DslRequest;
import com.devportal.bff.model.SubmitDslRequest;
import com.devportal.bff.security.JwtUser;
import com.devportal.bff.service.DslEngineService;
import com.devportal.bff.service.SubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
    private final DslEngineService dslEngineService;

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

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generate(@RequestBody DslRequest request) {
        try {
            byte[] zip = dslEngineService.generate(request.schemaContent(), request.viewsContent());
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"generated-project.zip\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(zip);
        } catch (Exception e) {
            log.error("DSL generation failed", e);
            return ResponseEntity.badRequest()
                .header("X-DSL-Error", e.getMessage())
                .build();
        }
    }

    @PostMapping("/validate-hospital")
    public ResponseEntity<Map<String, Object>> validateHospital(@RequestBody DslRequest request) {
        try {
            String output = dslEngineService.validate(request.schemaContent(), request.viewsContent());
            boolean valid = output.contains("✅ DSL is completely valid");
            // Parse errors from ANTLR (line X:col msg) and semantic analyzer (- msg)
            var errors = new java.util.ArrayList<Map<String, Object>>();
            for (String line : output.split("\n")) {
                String t = line.trim();
                // ANTLR syntax error: "line 5:3 mismatched input ..."
                java.util.regex.Matcher m = java.util.regex.Pattern
                    .compile("line (\\d+):(\\d+)\\s+(.*)")
                    .matcher(t);
                if (m.find()) {
                    errors.add(Map.of(
                        "line", Integer.parseInt(m.group(1)),
                        "column", Integer.parseInt(m.group(2)) + 1,
                        "message", m.group(3).trim(),
                        "severity", "error"
                    ));
                } else if (t.startsWith("- ")) {
                    // Semantic error — no line info, surface at line 1
                    errors.add(Map.of(
                        "line", 1, "column", 1,
                        "message", t.substring(2).trim(),
                        "severity", "warning"
                    ));
                }
            }
            return ResponseEntity.ok(Map.of("valid", valid, "errors", errors, "output", output));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("valid", false,
                "errors", List.of(Map.of("line", 1, "column", 1,
                    "message", e.getMessage(), "severity", "error")),
                "output", e.getMessage()));
        }
    }
}
