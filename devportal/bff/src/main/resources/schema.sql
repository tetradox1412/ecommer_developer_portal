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

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'DEVELOPER_PARTNER',
    google_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_activities (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    activity VARCHAR(500) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed some demo data
INSERT INTO submissions (id, developer_id, module_name, version, status, submitted_at) VALUES
    ('SUB-001', 'admin-001', 'loyalty-points', '1.2.0', 'ACTIVE', CURRENT_TIMESTAMP);
INSERT INTO submissions (id, developer_id, module_name, version, status, submitted_at) VALUES
    ('SUB-002', 'admin-001', 'payment-gateway', '0.9.0', 'COMPILING', CURRENT_TIMESTAMP);
INSERT INTO submissions (id, developer_id, module_name, version, status, submitted_at) VALUES
    ('SUB-003', 'admin-001', 'auth-adapter', '2.0.1', 'ERROR', CURRENT_TIMESTAMP);
INSERT INTO submissions (id, developer_id, module_name, version, status, submitted_at) VALUES
    ('SUB-004', 'admin-001', 'inventory-sync', '1.0.0', 'PENDING', CURRENT_TIMESTAMP);
INSERT INTO submissions (id, developer_id, module_name, version, status, submitted_at) VALUES
    ('SUB-005', 'admin-001', 'tax-calculator', '1.1.0', 'ACTIVE', CURRENT_TIMESTAMP);
INSERT INTO submissions (id, developer_id, module_name, version, status, submitted_at) VALUES
    ('SUB-006', 'admin-001', 'shipping-estimator', '2.3.4', 'ACTIVE', CURRENT_TIMESTAMP);
INSERT INTO submissions (id, developer_id, module_name, version, status, submitted_at) VALUES
    ('SUB-007', 'admin-001', 'crm-integration', '1.0.0', 'COMPILING', CURRENT_TIMESTAMP);
INSERT INTO submissions (id, developer_id, module_name, version, status, submitted_at) VALUES
    ('SUB-008', 'admin-001', 'analytics-exporter', '1.5.0', 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO tickets (id, title, description, requested_by, status, posted_at) VALUES
    ('TCK-001', 'Add bulk discount support', 'We need an API to apply bulk discounts when order quantity exceeds 50 units. Should integrate with existing pricing engine.', 'Acme Corp (anonymised)', 'OPEN', CURRENT_TIMESTAMP);
INSERT INTO tickets (id, title, description, requested_by, status, posted_at) VALUES
    ('TCK-002', 'Real-time inventory sync', 'Our warehouse system needs real-time inventory updates via webhook. Currently polling every 5 minutes causes overselling.', 'TechMart (anonymised)', 'OPEN', CURRENT_TIMESTAMP);
INSERT INTO tickets (id, title, description, requested_by, status, posted_at) VALUES
    ('TCK-003', 'Custom invoice template', 'Need ability to upload custom invoice PDF templates with dynamic fields for different regions and tax rules.', 'GlobalShop (anonymised)', 'CLAIMED', CURRENT_TIMESTAMP);
INSERT INTO tickets (id, title, description, requested_by, status, posted_at) VALUES
    ('TCK-004', 'Multi-currency support for EU', 'Requesting multi-currency conversions using daily updated forex rates for EU region transactions.', 'EuroMart (anonymised)', 'OPEN', CURRENT_TIMESTAMP);
INSERT INTO tickets (id, title, description, requested_by, status, posted_at) VALUES
    ('TCK-005', 'SSO via SAML 2.0', 'Enterprise customers want to login using their own Okta/AzureAD via SAML 2.0.', 'BigCorp (anonymised)', 'OPEN', CURRENT_TIMESTAMP);
INSERT INTO tickets (id, title, description, requested_by, status, posted_at) VALUES
    ('TCK-006', 'Gift card API integration', 'Please add support for validating and redeeming digital gift cards during checkout.', 'GiftsRUs (anonymised)', 'CLAIMED', CURRENT_TIMESTAMP);
INSERT INTO tickets (id, title, description, requested_by, status, posted_at) VALUES
    ('TCK-007', 'Loyalty point ledger discrepancy', 'Investigate why some users report missing points after refunds are issued.', 'RetailStore (anonymised)', 'OPEN', CURRENT_TIMESTAMP);
INSERT INTO tickets (id, title, description, requested_by, status, posted_at) VALUES
    ('TCK-008', 'Webhook retry mechanism', 'Webhooks failing due to temporary network issues are not retried. We need exponential backoff.', 'WebHookers (anonymised)', 'OPEN', CURRENT_TIMESTAMP);

-- Seed default developer user
INSERT INTO users (id, email, password_hash, name, role) VALUES
    ('dev-001', 'dev@devportal.com', '$2a$10$vQ6Mox8PjUoN2P/G4T7n6.O3d65/rV3d/K3g7Q2U3HkKk.D9p8NnS', 'Gabriel J.', 'DEVELOPER_PARTNER');
INSERT INTO users (id, email, password_hash, name, role) VALUES
    ('admin-001', 'admin', '$2a$10$RdzmvdsQBmL3kbHt6hSyzuP04WyUwgPLJwh5Tbk6oewCoSpm5s82O', 'Administrator', 'DEVELOPER_PARTNER');
