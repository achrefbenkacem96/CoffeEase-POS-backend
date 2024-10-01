import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [OrderService, OrderResolver, PrismaService],
})
export class OrderModule {}
