import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { Order } from 'src/users/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/services/products/products.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class UsersService {

    constructor(
        private readonly productsService: ProductsService,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly customersService: CustomersService
    ) { }

    findAll() {
        return this.usersRepository.find({
            relations: ['customer']
        });
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    async getOrdersByUser(id: number): Promise<Order> {
        const user = await this.findOne(id);
        return {
            date: new Date(),
            user,
            products: await this.productsService.findAll()
        }
    }

    async create(data: CreateUserDto) {
        const newUser = this.usersRepository.create(data);
        if (data.customerId) {
            const customer = await this.customersService.findOne(data.customerId);
            newUser.customer = customer;
        }
        return this.usersRepository.save(newUser);
    }

    async update(id: number, changes: UpdateUserDto) {
        const user = await this.usersRepository.findOne({ where: { id } })
        this.usersRepository.merge(user, changes)
        return this.usersRepository.save(user);
    }

    remove(id: number) {
        return this.usersRepository.delete(id)
    }
}
