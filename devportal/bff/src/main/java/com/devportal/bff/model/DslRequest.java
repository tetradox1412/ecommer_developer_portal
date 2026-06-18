package com.devportal.bff.model;

public record DslRequest(
    String schemaContent,
    String viewsContent
) {}
