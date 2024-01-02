import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from 'src/products/entities/brand.entity';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Brand) private readonly brandsService: Repository<Brand>
    ) { }

    findAll() {
        return this.productRepository.find({
            relations: ['brand']
        });
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['brand'] })
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    async create(payload: CreateProductDto) {
        const newProduct = this.productRepository.create(payload);
        if (payload.brandId) {
            const brand = await this.brandsService.findOne({ where: { id: payload.brandId } })
            newProduct.brand = brand;
        }
        return this.productRepository.save(newProduct);
    }

    async update(id: number, payload: UpdateProductDto) {
        const product = await this.productRepository.findOneBy({ id: id })
        if (payload.brandId) {
            const brand = await this.brandsService.findOne({ where: { id: payload.brandId } });
            product.brand = brand;
        }
        this.productRepository.merge(product, payload)
        return this.productRepository.save(product)
    }

    remove(id: number) {
        return this.productRepository.delete(id);
    }
}
