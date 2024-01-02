import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/bands.dto';
import { Brand } from 'src/products/entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brand) private readonly brandsService: Repository<Brand>
    ) { }

    findAll() {
        return this.brandsService.find({
            relations: ['products']
        });
    }

    async findOne(id: number) {
        const brand = await this.brandsService.findOneBy({ id });
        if (!brand) {
            throw new NotFoundException(`Brand #${id} not found`);
        }
        return brand;
    }

    create(data: CreateBrandDto) {
        const newBrand = this.brandsService.create(data);
        return this.brandsService.save(newBrand);
    }

    async update(id: number, changes: UpdateBrandDto) {
        const brand = await this.brandsService.findOneBy({ id: id });
        this.brandsService.merge(brand, changes);
        return this.brandsService.save(brand);
    }

    remove(id: number) {
        return this.brandsService.delete(id);
    }
}
