package com.devportal.bff.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SubmitDslRequest(
    @NotBlank String moduleName,
    @NotBlank @Pattern(regexp = "^\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?(?:\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$", message = "Version must be semver (e.g. 1.0.0)") String version,
    @NotBlank String dslCode,
    @NotBlank String manifestXml,
    String dslSchema,
    String dslViews,
    // Marketplace metadata — all optional for backward compatibility.
    // The portal's Review step enforces required fields client-side before calling.
    String displayName,
    String longDescription,
    String category,
    String industry,
    String iconName,
    String tagline,
    String color,
    String features,
    Double price,
    String changelog,
    String releaseNotes
) {}
