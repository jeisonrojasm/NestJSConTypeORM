import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/orders.dto';
import { Customer } from '../../entities/customer.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
        @InjectRepository(Customer) private readonly customersRepository: Repository<Customer>
    ) { }

    findAll() {
        return this.ordersRepository.find();
    }

    async findOne(id: number) {
        const order = await this.ordersRepository.findOne({ where: { id }, relations: ['items', 'items.product'] });
        if (!order) {
            throw new NotFoundException(`Order #${id} not found.`);
        }
        return order;
    }

    async create(payload: CreateOrderDto) {
        const newOrder = new Order();
        if (payload.customerId) {
            const customer = await this.customersRepository.findOne({ where: { id: payload.customerId } });
            newOrder.customer = customer;
        }
        return this.ordersRepository.save(newOrder);
    }

    async update(id: number, changes: UpdateOrderDto) {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (changes.customerId) {
            const customer = await this.customersRepository.findOne({ where: { id: changes.customerId } });
            order.customer = customer;
        }
        return this.ordersRepository.save(order);
    }

    remove(id: number) {
        return this.ordersRepository.delete(id);
    }
}
