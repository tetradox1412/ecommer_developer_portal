module payment-gateway {
  version "0.9.0"

  route POST "/payments/charge" {
    handler "process-charge"
    role "MERCHANT"
    timeout 30s
  }

  route POST "/payments/refund" {
    handler "issue-refund"
    role "MERCHANT"
    timeout 30s
  }

  entity Transaction {
    chargeId: String;
    amount: Float;
    status: String;
  }
}
