import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) { }

    findAll() {
        return this.productRepository.find();
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOneBy({ id: id })
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    create(payload: CreateProductDto) {
        const newProduct = this.productRepository.create(payload);
        return this.productRepository.save(newProduct);
    }

    async update(id: number, payload: UpdateProductDto) {
        const product = await this.productRepository.findOneBy({ id: id })
        this.productRepository.merge(product, payload)
        return this.productRepository.save(product)
    }

    remove(id: number) {
        return this.productRepository.delete(id);
    }
}
