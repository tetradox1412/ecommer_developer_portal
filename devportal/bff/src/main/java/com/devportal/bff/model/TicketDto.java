package com.devportal.bff.model;

public record TicketDto(
    String id,
    String title,
    String description,
    String requestedBy,
    String postedAt,
    String status,
    boolean claimedByMe
) {
    public static TicketDto from(TicketEntity e, String currentDeveloperId) {
        return new TicketDto(
            e.getId(),
            e.getTitle(),
            e.getDescription(),
            e.getRequestedBy(),
            e.getPostedAt() != null ? e.getPostedAt().toString() : null,
            e.getStatus(),
            e.getClaimedByDeveloperId() != null && e.getClaimedByDeveloperId().equals(currentDeveloperId)
        );
    }
}
