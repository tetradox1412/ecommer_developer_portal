package com.devportal.bff.model;

public record SubmissionDto(
    String id,
    String moduleName,
    String version,
    String status,
    String submittedAt,
    String errorMessage,
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
) {
    public static SubmissionDto from(SubmissionEntity e) {
        return new SubmissionDto(
            e.getId(),
            e.getModuleName(),
            e.getVersion(),
            e.getStatus(),
            e.getSubmittedAt() != null ? e.getSubmittedAt().toString() : null,
            e.getErrorMessage(),
            e.getDisplayName(),
            e.getLongDescription(),
            e.getCategory(),
            e.getIndustry(),
            e.getIconName(),
            e.getTagline(),
            e.getColor(),
            e.getFeatures(),
            e.getPrice(),
            e.getChangelog(),
            e.getReleaseNotes()
        );
    }
}
