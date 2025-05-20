export interface OrderHistoryItem {
  orderId: string;
  placedAt: Date; // or Firebase Timestamp
  total: number;
  status: string; // e.g. "delivered", "pending"
}
