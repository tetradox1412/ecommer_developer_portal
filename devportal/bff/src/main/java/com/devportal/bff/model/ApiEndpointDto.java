package com.devportal.bff.model;

import java.util.Map;

public record ApiEndpointDto(
    String path,
    String method,
    String description,
    String requiredRole,
    Map<String, Object> requestSchema,
    Map<String, Object> responseSchema,
    Map<String, Object> exampleResponse
) {}
