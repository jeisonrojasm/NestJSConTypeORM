import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { Product } from '../../../products/entities/product.entity';
import { CreateOrderItemDto } from '../../dtos/order-item.dto';

@Injectable()
export class OrderItemsService {
    constructor(
        @InjectRepository(Order) private readonly ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem) private readonly orderItemsRepository: Repository<OrderItem>,
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>
    ) { }

    async create(payload: CreateOrderItemDto) {
        const order = await this.ordersRepository.findOne({ where: { id: payload.orderId } });
        const product = await this.productsRepository.findOne({ where: { id: payload.productId } });

        const item = new OrderItem();
        item.order = order;
        item.product = product;

        item.quantity = payload.quantity;

        return this.orderItemsRepository.save(item);
    }
}

