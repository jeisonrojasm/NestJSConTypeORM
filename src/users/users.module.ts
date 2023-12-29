import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';
import { ProductsModule } from 'src/products/products.module';

import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule { }
