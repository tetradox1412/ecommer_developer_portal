module loyalty-points {
  version "1.2.0"

  // Register partner charge webhook
  route POST "/charge" {
    handler "stripe-charge"
    role "DEVELOPER_PARTNER"
    timeout 15s
  }

  entity PointLedger {
    customerId: String;
    points: Integer;
  }
}
