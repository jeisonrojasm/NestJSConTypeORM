import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { OrdersService } from '../../services/orders/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) { }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    get(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.ordersService.findOne(id);
    }

    @Post()
    create(
        @Body() payload: CreateOrderDto
    ) {
        return this.ordersService.create(payload);
    }

    @Put()
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() changes: UpdateOrderDto
    ) {
        return this.ordersService.update(id, changes);
    }

    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.ordersService.remove(id);
    }
}
