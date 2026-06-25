package com.devportal.bff.model;

public record VersionInfoDto(
    String version,
    String status,
    String submittedAt
) {
    public static VersionInfoDto from(SubmissionEntity e) {
        return new VersionInfoDto(
            e.getVersion(),
            e.getStatus(),
            e.getSubmittedAt() != null ? e.getSubmittedAt().toString() : null
        );
    }
}
