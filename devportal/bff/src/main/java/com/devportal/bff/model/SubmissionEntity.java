package com.devportal.bff.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionEntity {
    @Id
    private String id;

    @Column(name = "developer_id", nullable = false)
    private String developerId;

    @Column(name = "module_name", nullable = false)
    private String moduleName;

    @Column(nullable = false)
    private String version;

    @Column(nullable = false)
    private String status;

    @Column(name = "dsl_code", columnDefinition = "TEXT")
    private String dslCode;

    @Column(name = "manifest_xml", columnDefinition = "TEXT")
    private String manifestXml;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = "PENDING";
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
