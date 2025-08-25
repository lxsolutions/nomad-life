










import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ListingsModule } from './listings/listings.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    VehiclesModule,
    ListingsModule,
    BookingsModule,
    PaymentsModule,
    ClaimsModule
  ],
})
export class AppModule {}










