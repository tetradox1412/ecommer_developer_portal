package com.devportal.bff.model;

import java.util.List;

public record ModuleApi(
    String moduleName,
    String version,
    List<ApiEndpointDto> endpoints
) {}
