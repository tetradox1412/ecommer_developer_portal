package com.devportal.bff.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SubmitDslRequest(
    @NotBlank String moduleName,
    @NotBlank @Pattern(regexp = "^\\d+\\.\\d+\\.\\d+$", message = "Version must be semver (e.g. 1.0.0)") String version,
    @NotBlank String dslCode,
    @NotBlank String manifestXml
) {}
