package com.devportal.bff.client;

import com.devportal.bff.model.ApiEndpointDto;
import com.devportal.bff.model.ModuleApi;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class WrapperClient {

    private final RestClient restClient;

    public WrapperClient(@Value("${services.wrapper.url}") String baseUrl) {
        this.restClient = RestClient.builder().baseUrl(baseUrl).build();
    }

    public List<ModuleApi> getAllModuleApis() {
        // Mock data — in production: GET /api/wrapper/modules then for each GET /api/wrapper/modules/{name}/apis
        return List.of(
            new ModuleApi("loyalty-points", "1.2.0", List.of(
                new ApiEndpointDto("/api/loyalty/points/add", "POST", "Add points to a customer's account", "ACTIVE_CUSTOMER",
                    Map.of("customerId", "string", "points", "number"), null, Map.of("newBalance", 250)),
                new ApiEndpointDto("/api/loyalty/points/redeem", "POST", "Redeem loyalty points for a discount", "ACTIVE_CUSTOMER",
                    Map.of("customerId", "string", "points", "number"), null, Map.of("discountApplied", 10.0, "remainingPoints", 150)),
                new ApiEndpointDto("/api/loyalty/points/balance", "GET", "Get current loyalty points balance", "ACTIVE_CUSTOMER",
                    null, null, Map.of("customerId", "C-1234", "balance", 250, "tier", "GOLD"))
            )),
            new ModuleApi("payment-gateway", "0.9.0", List.of(
                new ApiEndpointDto("/api/payments/charge", "POST", "Process a payment charge", "MERCHANT",
                    Map.of("amount", "number", "currency", "string", "cardToken", "string"), null, Map.of("chargeId", "ch_abc123", "status", "succeeded")),
                new ApiEndpointDto("/api/payments/refund", "POST", "Issue a refund for a previous charge", "MERCHANT",
                    Map.of("chargeId", "string", "amount", "number"), null, Map.of("refundId", "rf_xyz789", "status", "pending"))
            )),
            new ModuleApi("inventory-sync", "2.1.0", List.of(
                new ApiEndpointDto("/api/inventory/stock", "GET", "Get current stock levels for a product", "WAREHOUSE_MANAGER",
                    null, null, Map.of("productId", "P-001", "available", 142, "reserved", 18)),
                new ApiEndpointDto("/api/inventory/webhook/register", "POST", "Register a webhook for stock changes", "WAREHOUSE_MANAGER",
                    Map.of("callbackUrl", "string", "events", "array"), null, Map.of("webhookId", "wh_001", "status", "active")),
                new ApiEndpointDto("/api/inventory/bulk-update", "PUT", "Bulk update stock levels across warehouses", "WAREHOUSE_MANAGER",
                    Map.of("updates", "array"), null, Map.of("updated", 47, "failed", 0))
            ))
        );
    }
}
