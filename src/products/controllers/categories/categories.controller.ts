import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/products/dtos/categories.dto';
import { CategoriesService } from 'src/products/services/categories/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @ApiOperation({ summary: 'List all categories' })
    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @ApiOperation({ summary: 'Return a catgory searched by id' })
    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findOne(id);
    }

    @ApiOperation({ summary: 'Create a new category' })
    @Post()
    create(@Body() payload: CreateCategoryDto) {
        return this.categoriesService.create(payload);
    }

    @ApiOperation({ summary: 'Update a category searched by id' })
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(id, payload);
    }

    @ApiOperation({ summary: 'Delete a category searched by id' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.remove(+id);
    }
}
