import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/bands.dto';
import { BrandsService } from 'src/products/services/brands/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) { }

    @ApiOperation({ summary: `List all brands` })
    @Get()
    findAll() {
        return this.brandsService.findAll();
    }

    @ApiOperation({ summary: 'Return a brand searched by id' })
    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.brandsService.findOne(id);
    }

    @ApiOperation({ summary: 'Create a new brand' })
    @Post()
    create(@Body() payload: CreateBrandDto) {
        return this.brandsService.create(payload);
    }

    @ApiOperation({ summary: 'Update a brand searched by id' })
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateBrandDto,
    ) {
        return this.brandsService.update(id, payload);
    }

    @ApiOperation({ summary: 'Delete a brand searched by id' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.brandsService.remove(id);
    }
}



