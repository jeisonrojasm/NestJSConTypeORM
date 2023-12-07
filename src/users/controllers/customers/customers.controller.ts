import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customers.dto';
import { CustomersService } from 'src/users/services/customers/customers.service';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) { }

    @ApiOperation({ summary: `List all customers` })
    @Get()
    findAll() {
        return this.customersService.findAll();
    }

    @ApiOperation({ summary: 'Return a customer searched by id' })
    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.findOne(id);
    }

    @ApiOperation({ summary: 'Create a new customer' })
    @Post()
    create(@Body() payload: CreateCustomerDto) {
        return this.customersService.create(payload);
    }

    @ApiOperation({ summary: 'Update a customer searched by id' })
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCustomerDto,
    ) {
        return this.customersService.update(id, payload);
    }

    @ApiOperation({ summary: 'Delete a customer searched by id' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.remove(id);
    }
}
