module inventory-sync {
  version "2.1.0"

  route GET "/inventory/stock" {
    handler "get-stock"
    role "WAREHOUSE_MANAGER"
  }

  route POST "/inventory/webhook/register" {
    handler "register-webhook"
    role "WAREHOUSE_MANAGER"
  }

  route PUT "/inventory/bulk-update" {
    handler "bulk-update"
    role "WAREHOUSE_MANAGER"
    timeout 60s
  }

  entity StockLevel {
    productId: String;
    available: Integer;
    reserved: Integer;
  }
}
