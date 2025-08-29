import { Controller, Get, Post, Body } from '@nestjs/common';
import { Order } from '@nomad-life/contracts';

@Controller('booking')
export class BookingController {
  private orders: Order[] = [
    {
      id: '1',
      userId: 'user-1',
      kind: 'stay',
      subtotal: { amount: 10000, currency: 'USD' },
      fees: { amount: 500, currency: 'USD' },
      total: { amount: 10500, currency: 'USD' },
      status: 'paid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  @Get('orders')
  getOrders(): Order[] {
    return this.orders;
  }

  @Post('orders')
  createOrder(@Body() orderData: Partial<Order>): Order {
    const newOrder: Order = {
      id: (this.orders.length + 1).toString(),
      userId: orderData.userId || 'unknown',
      kind: orderData.kind || 'stay',
      subtotal: orderData.subtotal || { amount: 0, currency: 'USD' },
      fees: orderData.fees || { amount: 0, currency: 'USD' },
      total: orderData.total || { amount: 0, currency: 'USD' },
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.orders.push(newOrder);
    return newOrder;
  }
}
