package com.devportal.bff.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Slf4j
@Component
public class SaasControllerClient {

    private final RestClient restClient;

    public SaasControllerClient(@Value("${services.saas-controller.url}") String baseUrl) {
        this.restClient = RestClient.builder().baseUrl(baseUrl).build();
    }

    public boolean checkLicense(String developerId) {
        // Mock: always returns true in dev
        // In production: GET /api/saas/license/{developerId}
        log.info("Checking license for developer: {}", developerId);
        return true;
    }
}
