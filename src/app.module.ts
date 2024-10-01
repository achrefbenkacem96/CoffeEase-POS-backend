import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module'; // Ajout du module catégorie
import { PrismaService } from './prisma.service';
import { MenuModule } from './menu/menu.module'; // Import du module Menu
import { TableModule } from './table/table.module';
import { PaymentModule } from './payment/payment.module';
import { StockModule } from './stock/stock.module';
import { SalesReportModule } from './sales-report/sales-report.module';
import { StockReportModule } from './stock-report/stock-report.module';
import { FinancialReportModule } from './financial-report/financial-report.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    CategoryModule, // Ajout du module catégorie
    MenuModule,
    TableModule, // Ajout du module Menu
    PaymentModule,
    StockModule,
    SalesReportModule,
    StockReportModule, 
    FinancialReportModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
