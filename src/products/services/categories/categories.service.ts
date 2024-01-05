import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/products/dtos/categories.dto';
import { Category } from 'src/products/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private readonly categoriesService: Repository<Category>) { }

    findAll() {
        return this.categoriesService.find();
    }

    async findOne(id: number) {
        const category = await this.categoriesService.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category #${id} not found`);
        }
        return category;
    }

    create(data: CreateCategoryDto) {
        const newCategory = this.categoriesService.create(data);
        return this.categoriesService.save(newCategory);
    }

    async update(id: number, changes: UpdateCategoryDto) {
        const category = await this.categoriesService.findOne({ where: { id } });
        this.categoriesService.merge(category, changes);
        return this.categoriesService.save(category);
    }

    remove(id: number) {
        return this.categoriesService.delete(id);
    }
}
