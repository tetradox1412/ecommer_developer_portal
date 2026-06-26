# DSL Syntax Reference Guide

## Overview

The Developer Portal DSL (Domain-Specific Language) is a declarative language for defining custom eCommerce modules, routes, and business logic. It enables developers to integrate external services and custom functionality into the SaaS platform.

## Core Syntax Structure

### Module Declaration

```dsl
module <module-name> {
  version "<semantic-version>"
  
  // Module configuration and routes
}
```

**Parameters:**
- `module-name`: Alphanumeric identifier with hyphens (e.g., `loyalty-points`, `payment-gateway`)
- `version`: Semantic version string in format X.Y.Z (e.g., "1.0.0")

**Example:**
```dsl
module loyalty-points {
  version "1.0.0"
  
  // Routes and handlers defined here
}
```

---

## Route Definition

Routes define HTTP endpoints that will be exposed by your module.

### Basic Route Syntax

```dsl
route <METHOD> "<path>" {
  handler "<handler-name>"
  role "<ROLE_NAME>"
  timeout <duration>
}
```

**Parameters:**
- `METHOD`: HTTP method (GET, POST, PUT, PATCH, DELETE)
- `path`: URL path starting with `/` (e.g., `/charge`, `/users/:id`)
- `handler`: Name of the handler function (referenced in implementation)
- `role`: Required role to access endpoint (e.g., `DEVELOPER_PARTNER`, `ADMIN`, `CUSTOMER`)
- `timeout`: Request timeout in seconds (e.g., `15s`, `30s`)

**Example:**
```dsl
route POST "/charge" {
  handler "stripe-charge"
  role "DEVELOPER_PARTNER"
  timeout 15s
}

route GET "/users/:id" {
  handler "get-user-details"
  role "ADMIN"
  timeout 10s
}
```

---

## Path Parameters

Routes support dynamic path parameters using colon notation:

```dsl
route GET "/orders/:orderId/items/:itemId" {
  handler "get-order-item"
  role "CUSTOMER"
  timeout 5s
}
```

The parameters `:orderId` and `:itemId` will be available in the handler context.

---

## Query Parameters

Query parameters are automatically parsed and available in handlers:

```dsl
route GET "/products" {
  handler "list-products"
  role "CUSTOMER"
  timeout 10s
}
```

Call example: `/products?category=electronics&limit=20`

---

## Request/Response Schema Validation

Define JSON schemas for request and response validation:

```dsl
route POST "/payment" {
  handler "process-payment"
  role "CUSTOMER"
  timeout 30s
  
  request_schema {
    amount: number
    currency: string
    card_token: string
  }
  
  response_schema {
    transaction_id: string
    status: enum["success", "failed", "pending"]
    message: string
  }
}
```

---

## Metadata and Dependencies

Modules can declare dependencies on other modules or services:

```dsl
module payment-processor {
  version "2.1.0"
  
  depends_on "auth-service@1.x"
  depends_on "user-service@2.1"
  
  author "FinTech Solutions Inc."
  description "Multi-gateway payment orchestration"
  
  route POST "/process" {
    handler "process-payment"
    role "CUSTOMER"
    timeout 20s
  }
}
```

---

## Environment Variables

Access configuration via environment variables:

```dsl
module shipping-calculator {
  version "1.0.0"
  
  config {
    api_key: env("SHIPPING_API_KEY")
    webhook_url: env("WEBHOOK_ENDPOINT")
    max_retry: 3
  }
  
  route POST "/calculate" {
    handler "calculate-shipping"
    role "CUSTOMER"
    timeout 10s
  }
}
```

---

## Middleware and Hooks

Apply middleware or lifecycle hooks:

```dsl
route POST "/webhook" {
  handler "handle-webhook"
  role "PUBLIC"
  timeout 5s
  
  middleware ["rate-limiter", "signature-validator"]
  
  before_handler "verify-signature"
  after_handler "log-event"
}
```

---

## Comments

Both single-line and multi-line comments are supported:

```dsl
// Single-line comment

/*
  Multi-line comment
  explaining complex logic
*/

module example {
  version "1.0.0"  // inline comment
}
```

---

## Error Handling

Define custom error responses:

```dsl
route POST "/charge" {
  handler "charge-card"
  role "CUSTOMER"
  timeout 15s
  
  on_error {
    400: "Invalid payment details"
    402: "Insufficient funds"
    500: "Payment gateway timeout"
  }
}
```

---

## Rate Limiting

Apply rate limits to routes:

```dsl
route GET "/public-api" {
  handler "public-data"
  role "PUBLIC"
  timeout 5s
  
  rate_limit {
    requests: 100
    window: "1m"  // per minute
  }
}
```

---

## Complete Example

```dsl
module loyalty-rewards {
  version "2.0.0"
  
  author "RetailTech Labs"
  description "Points-based rewards and tier management"
  
  depends_on "auth-service@1.x"
  depends_on "user-service@2.x"
  
  config {
    points_multiplier: env("POINTS_MULTIPLIER")
    webhook_secret: env("WEBHOOK_SECRET")
  }
  
  // Award points for purchase
  route POST "/award-points" {
    handler "award-purchase-points"
    role "CUSTOMER"
    timeout 10s
    
    request_schema {
      user_id: string
      amount: number
      order_id: string
    }
    
    response_schema {
      points_awarded: number
      new_balance: number
      tier: string
    }
  }
  
  // Get user balance
  route GET "/balance/:userId" {
    handler "get-points-balance"
    role "CUSTOMER"
    timeout 5s
    
    response_schema {
      balance: number
      tier: string
      expiring_soon: number
    }
  }
  
  // Redeem points
  route POST "/redeem" {
    handler "redeem-points"
    role "CUSTOMER"
    timeout 15s
    
    request_schema {
      user_id: string
      points: number
      reward_id: string
    }
    
    response_schema {
      success: boolean
      new_balance: number
      transaction_id: string
    }
    
    rate_limit {
      requests: 10
      window: "1m"
    }
  }
  
  // Webhook receiver
  route POST "/webhook/tier-upgrade" {
    handler "process-tier-upgrade"
    role "SYSTEM"
    timeout 5s
    
    middleware ["webhook-signature-validator"]
  }
}
```

---

## Validation Rules

### Module Name
- Lowercase alphanumeric with hyphens/underscores
- No spaces or special characters
- Example: `payment-gateway`, `auth_service`

### Version
- Must follow semantic versioning: `MAJOR.MINOR.PATCH`
- Optional pre-release: `1.0.0-beta.1`
- Example: `1.0.0`, `2.1.3`, `0.5.0-alpha`

### Handler Names
- Lowercase with hyphens
- Descriptive action names
- Example: `process-payment`, `get-user`, `send-email`

### Role Names
- UPPERCASE with underscores
- Predefined roles: `PUBLIC`, `CUSTOMER`, `DEVELOPER_PARTNER`, `ADMIN`, `SYSTEM`
- Example: `DEVELOPER_PARTNER`, `ADMIN`

### Timeout Duration
- Integer followed by time unit: `s` (seconds), `m` (minutes)
- Range: 1s to 300s (5 minutes)
- Example: `10s`, `30s`, `2m`

---

## Compilation Process

1. **Lexical Analysis**: Tokenizes DSL source code
2. **Syntax Parsing**: Builds Abstract Syntax Tree (AST)
3. **Semantic Validation**: Checks types, roles, dependencies
4. **Code Generation**: Generates runtime route handlers
5. **Deployment**: Deploys to isolated sandbox container
6. **Activation**: Routes become live and queryable via API Gateway

---

## Best Practices

1. **Use Semantic Versioning**: Increment versions appropriately (MAJOR.MINOR.PATCH)
2. **Define Request/Response Schemas**: Enable automatic validation
3. **Set Appropriate Timeouts**: Match handler complexity (5s for reads, 30s for writes)
4. **Apply Rate Limits**: Protect endpoints from abuse
5. **Use Descriptive Handler Names**: Make code self-documenting
6. **Add Comments**: Explain complex business logic
7. **Declare Dependencies**: Ensure required services are available
8. **Handle Errors Gracefully**: Provide meaningful error messages

---

## Debugging Tips

- Use **DSL Playground** to validate syntax before submission
- Check **Sandbox Monitor** for real-time compilation logs
- Review **Ticket Inbox** for validation error details
- Test routes in **API Explorer** after successful deployment
- Monitor resource usage in **Sandbox Dashboard**

---

## Supported HTTP Methods

| Method | Usage | Idempotent |
|--------|-------|------------|
| GET | Retrieve resources | Yes |
| POST | Create resources | No |
| PUT | Replace/update resources | Yes |
| PATCH | Partial update | No |
| DELETE | Remove resources | Yes |

---

## Reserved Keywords

The following keywords are reserved and cannot be used as identifiers:

- `module`
- `version`
- `route`
- `handler`
- `role`
- `timeout`
- `request_schema`
- `response_schema`
- `depends_on`
- `config`
- `env`
- `middleware`
- `on_error`
- `rate_limit`
- `before_handler`
- `after_handler`

---

## Error Codes

Common compilation/validation errors:

| Code | Message | Solution |
|------|---------|----------|
| DSL-001 | Invalid module name | Use alphanumeric with hyphens |
| DSL-002 | Missing version | Add `version "X.Y.Z"` |
| DSL-003 | Invalid HTTP method | Use GET/POST/PUT/PATCH/DELETE |
| DSL-004 | Route path must start with / | Prefix path with slash |
| DSL-005 | Unknown role | Use predefined roles |
| DSL-006 | Timeout out of range | Use 1s-300s |
| DSL-007 | Handler name missing | Define handler |
| DSL-008 | Dependency not found | Check module name and version |

---

## Additional Resources

- **API Explorer**: Browse all active module endpoints
- **Manifest Builder**: Generate deployment manifests
- **Submission Portal**: Deploy and monitor modules
- **DSL Playground**: Interactive syntax testing environment

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained by**: Developer Platform Team
