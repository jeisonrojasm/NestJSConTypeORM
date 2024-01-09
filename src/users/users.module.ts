import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';
import { ProductsModule } from 'src/products/products.module';

import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersService } from './services/orders/orders.service';
import { OrderItemsController } from './controllers/order-items/order-items.controller';
import { OrderItemsService } from './services/order-items/order-items.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer, Order, OrderItem])],
  controllers: [CustomersController, UsersController, OrdersController, OrderItemsController],
  providers: [CustomersService, UsersService, OrdersService, OrderItemsService],
})
export class UsersModule { }
