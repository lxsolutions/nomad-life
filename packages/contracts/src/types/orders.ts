export type OrderKind = 'stay' | 'ride';
export type OrderStatus = 'pending' | 'paid' | 'canceled' | 'refunded';

export interface Money {
  amount: number;        // minor units (e.g., cents)
  currency: string;      // ISO 4217
}

export interface Order {
  id: string;
  userId: string;
  orgId?: string | null;
  kind: OrderKind;
  subtotal: Money;
  fees: Money;
  total: Money;
  status: OrderStatus;
  paymentId?: string | null;
  metadata?: Record<string, unknown>;
  createdAt: string;     // ISO datetime
  updatedAt: string;     // ISO datetime
}

export interface Payment {
  id: string;
  provider: 'stripe';
  providerRef: string;   // pi_*, ch_*, etc.
  amount: Money;
  status: 'requires_action' | 'succeeded' | 'canceled' | 'refunded';
  createdAt: string;
  updatedAt: string;
}