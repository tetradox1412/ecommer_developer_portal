package com.devportal.bff.model;

public record SubmissionDto(
    String id,
    String moduleName,
    String version,
    String status,
    String submittedAt,
    String errorMessage
) {
    public static SubmissionDto from(SubmissionEntity e) {
        return new SubmissionDto(
            e.getId(),
            e.getModuleName(),
            e.getVersion(),
            e.getStatus(),
            e.getSubmittedAt() != null ? e.getSubmittedAt().toString() : null,
            e.getErrorMessage()
        );
    }
}
