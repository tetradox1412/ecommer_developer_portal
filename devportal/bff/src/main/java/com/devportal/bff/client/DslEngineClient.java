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

    /**
     * Validates DSL code with basic syntax checks.
     * In production this would delegate to the DSL Engine service.
     */
    public List<Map<String, Object>> validateDsl(String dslCode) {
        if (dslCode == null || dslCode.isBlank()) {
            return List.of(Map.of("line", 1, "message", "DSL code cannot be empty"));
        }

        List<Map<String, Object>> errors = new java.util.ArrayList<>();
        String[] lines = dslCode.split("\n", -1);

        boolean hasModule = false;
        boolean hasVersion = false;
        int braceDepth = 0;

        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].strip();
            if (line.isEmpty() || line.startsWith("//")) continue;

            if (line.startsWith("module ") && line.contains("{")) {
                hasModule = true;
                braceDepth++;
                String namePart = line.substring(7, line.indexOf('{')).strip();
                if (namePart.isEmpty()) {
                    errors.add(Map.of("line", i + 1, "message", "Module name is missing"));
                } else if (!namePart.matches("[a-zA-Z_][a-zA-Z0-9_-]*")) {
                    errors.add(Map.of("line", i + 1, "message", "Invalid module name '" + namePart + "' — must start with a letter and contain only letters, numbers, hyphens, or underscores"));
                }
            } else if (line.startsWith("module ")) {
                hasModule = true;
                String namePart = line.substring(7).strip();
                if (namePart.isEmpty()) {
                    errors.add(Map.of("line", i + 1, "message", "Module name is missing"));
                } else if (!namePart.matches("[a-zA-Z_][a-zA-Z0-9_-]*")) {
                    errors.add(Map.of("line", i + 1, "message", "Invalid module name '" + namePart + "' — must start with a letter and contain only letters, numbers, hyphens, or underscores"));
                }
            }

            // Track brace depth
            for (char c : line.toCharArray()) {
                if (c == '{') braceDepth++;
                if (c == '}') braceDepth--;
            }

            if (line.startsWith("version ")) {
                hasVersion = true;
                String versionStr = line.substring(8).strip();
                if (versionStr.isEmpty()) {
                    errors.add(Map.of("line", i + 1, "message", "Version value is missing"));
                } else if (!versionStr.matches("\"\\d+\\.\\d+\\.\\d+\"")) {
                    errors.add(Map.of("line", i + 1, "message", "Invalid version format — expected semver in quotes, e.g. \"1.0.0\""));
                }
            }

            // Check route declarations
            if (line.startsWith("route ")) {
                String routeRemaining = line.substring(6).strip();
                String[] routeParts = routeRemaining.split("\\s+", 3);
                if (routeParts.length < 2) {
                    errors.add(Map.of("line", i + 1, "message", "Route declaration is incomplete — expected format: route METHOD \"/path\" { ... }"));
                } else {
                    String method = routeParts[0];
                    if (!method.matches("GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS")) {
                        errors.add(Map.of("line", i + 1, "message", "Invalid HTTP method '" + method + "' — expected GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS"));
                    }
                    String path = routeParts.length >= 2 ? routeParts[1] : "";
                    if (!path.startsWith("\"") || !path.endsWith("\"")) {
                        errors.add(Map.of("line", i + 1, "message", "Route path must be a quoted string, e.g. \"/charge\""));
                    }
                }
            }

            // Check handler declarations inside routes
            if (line.startsWith("handler ")) {
                String handlerName = line.substring(8).strip();
                if (handlerName.isEmpty()) {
                    errors.add(Map.of("line", i + 1, "message", "Handler name is missing"));
                } else if (!handlerName.matches("\"[a-zA-Z_][a-zA-Z0-9_-]*\"")) {
                    errors.add(Map.of("line", i + 1, "message", "Handler must be a quoted string identifier, e.g. \"stripe-charge\""));
                }
            }

            // Check role declarations
            if (line.startsWith("role ")) {
                String roleName = line.substring(5).strip();
                if (roleName.isEmpty()) {
                    errors.add(Map.of("line", i + 1, "message", "Role value is missing"));
                } else if (!roleName.matches("\"[A-Z_][A-Z_]*\"")) {
                    errors.add(Map.of("line", i + 1, "message", "Role must be a quoted uppercase string, e.g. \"DEVELOPER_PARTNER\""));
                }
            }

            // Check timeout declarations (experimental / optional)
            if (line.startsWith("timeout ")) {
                String timeoutVal = line.substring(8).strip();
                if (timeoutVal.isEmpty()) {
                    errors.add(Map.of("line", i + 1, "message", "Timeout value is missing"));
                } else if (!timeoutVal.matches("\\d+[smh]")) {
                    errors.add(Map.of("line", i + 1, "message", "Invalid timeout format — expected a number followed by s/m/h (e.g. 15s, 5m, 1h)"));
                }
            }
        }

        // Structural checks
        if (!hasModule) {
            errors.add(Map.of("line", 1, "message", "Missing module declaration — DSL must start with 'module <name> { ... }'"));
        }
        if (!hasVersion) {
            errors.add(Map.of("line", 1, "message", "Missing version declaration — add 'version \"x.y.z\"' inside the module block"));
        }
        if (braceDepth > 0) {
            errors.add(Map.of("line", lines.length, "message", "Unclosed block — expected closing '}' for module or route block"));
        } else if (braceDepth < 0) {
            errors.add(Map.of("line", 1, "message", "Unexpected closing brace '}' without matching opening brace"));
        }

        return errors;
    }
}
