CREATE TABLE IF NOT EXISTS submissions (
    id VARCHAR(255) PRIMARY KEY,
    developer_id VARCHAR(255) NOT NULL,
    module_name VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    dsl_code TEXT,
    manifest_xml TEXT,
    error_message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tickets (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    requested_by VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN',
    claimed_by_developer_id VARCHAR(255),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed some demo data
INSERT INTO submissions (id, developer_id, module_name, version, status, submitted_at) VALUES
    ('SUB-001', 'dev-001', 'loyalty-points', '1.2.0', 'ACTIVE', CURRENT_TIMESTAMP),
    ('SUB-002', 'dev-001', 'payment-gateway', '0.9.0', 'COMPILING', CURRENT_TIMESTAMP),
    ('SUB-003', 'dev-001', 'auth-adapter', '2.0.1', 'ERROR', CURRENT_TIMESTAMP),
    ('SUB-004', 'dev-001', 'inventory-sync', '1.0.0', 'PENDING', CURRENT_TIMESTAMP),
    ('SUB-005', 'dev-001', 'tax-calculator', '1.1.0', 'ACTIVE', CURRENT_TIMESTAMP),
    ('SUB-006', 'dev-001', 'shipping-estimator', '2.3.4', 'ACTIVE', CURRENT_TIMESTAMP),
    ('SUB-007', 'dev-001', 'crm-integration', '1.0.0', 'COMPILING', CURRENT_TIMESTAMP),
    ('SUB-008', 'dev-001', 'analytics-exporter', '1.5.0', 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO tickets (id, title, description, requested_by, status, posted_at) VALUES
    ('TCK-001', 'Add bulk discount support', 'We need an API to apply bulk discounts when order quantity exceeds 50 units. Should integrate with existing pricing engine.', 'Acme Corp (anonymised)', 'OPEN', CURRENT_TIMESTAMP),
    ('TCK-002', 'Real-time inventory sync', 'Our warehouse system needs real-time inventory updates via webhook. Currently polling every 5 minutes causes overselling.', 'TechMart (anonymised)', 'OPEN', CURRENT_TIMESTAMP),
    ('TCK-003', 'Custom invoice template', 'Need ability to upload custom invoice PDF templates with dynamic fields for different regions and tax rules.', 'GlobalShop (anonymised)', 'CLAIMED', CURRENT_TIMESTAMP),
    ('TCK-004', 'Multi-currency support for EU', 'Requesting multi-currency conversions using daily updated forex rates for EU region transactions.', 'EuroMart (anonymised)', 'OPEN', CURRENT_TIMESTAMP),
    ('TCK-005', 'SSO via SAML 2.0', 'Enterprise customers want to login using their own Okta/AzureAD via SAML 2.0.', 'BigCorp (anonymised)', 'OPEN', CURRENT_TIMESTAMP),
    ('TCK-006', 'Gift card API integration', 'Please add support for validating and redeeming digital gift cards during checkout.', 'GiftsRUs (anonymised)', 'CLAIMED', CURRENT_TIMESTAMP),
    ('TCK-007', 'Loyalty point ledger discrepancy', 'Investigate why some users report missing points after refunds are issued.', 'RetailStore (anonymised)', 'OPEN', CURRENT_TIMESTAMP),
    ('TCK-008', 'Webhook retry mechanism', 'Webhooks failing due to temporary network issues are not retried. We need exponential backoff.', 'WebHookers (anonymised)', 'OPEN', CURRENT_TIMESTAMP);
