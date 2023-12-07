import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { ProductsService } from 'src/products/services/products/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @ApiOperation({ summary: 'List all products' })
    @Get()
    getProducts(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand: string,
    ) {
        return this.productsService.findAll();
    }

    @ApiOperation({ summary: 'Return a product searched by id' })
    @Get(':productId')
    getOne(@Param('productId', ParseIntPipe) productId: number) {
        return this.productsService.findOne(productId);
    }

    @ApiOperation({ summary: 'Create a new product' })
    @Post()
    create(@Body() payload: CreateProductDto) {
        return this.productsService.create(payload);
    }

    @ApiOperation({ summary: 'Update a product searched by id' })
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDto) {
        return this.productsService.update(id, payload);
    }

    @ApiOperation({ summary: 'Delete a product searched by id' })
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.productsService.remove(id);
    }
}
