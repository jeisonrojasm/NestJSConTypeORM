import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Brand } from 'src/products/entities/brand.entity';
import { BrandsService } from '../brands/brands.service';
import { Category } from 'src/products/entities/category.entity';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Brand) private readonly brandsRepository: Repository<Brand>,
        @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>
    ) { }

    findAll(params?: FilterProductsDto) {
        if (params.take && params.skip) {
            return this.productRepository.find({
                relations: ['brand', 'categories'],
                order: { id: 'ASC' },
                take: params.take,
                skip: params.skip
            });
        }

        if (params.minPrice >= 0 && params.maxPrice > 0) {
            return this.productRepository.find({
                relations: ['brand', 'categories'],
                order: { id: 'ASC' },
                where: { price: Between(params.minPrice, params.maxPrice) }
            });
        }

        return this.productRepository.find({
            relations: ['brand', 'categories'],
            order: { id: 'ASC' }
        });
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['brand', 'categories'] })
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    async create(payload: CreateProductDto) {
        const newProduct = this.productRepository.create(payload);
        if (payload.brandId) {
            const brand = await this.brandsRepository.findOne({ where: { id: payload.brandId } })
            newProduct.brand = brand;
        }
        if (payload.categoriesIds) {
            const categories = await this.categoriesRepository.findBy({ id: In(payload.categoriesIds) })
            newProduct.categories = categories;
        }
        return this.productRepository.save(newProduct);
    }

    async update(id: number, payload: UpdateProductDto) {
        const product = await this.productRepository.findOneBy({ id: id })
        if (payload.brandId) {
            const brand = await this.brandsRepository.findOne({ where: { id: payload.brandId } });
            product.brand = brand;
        }
        if (payload.categoriesIds) {
            const categories = await this.categoriesRepository.findBy({ id: In(payload.categoriesIds) })
            product.categories = categories;
        }
        this.productRepository.merge(product, payload)
        return this.productRepository.save(product)
    }

    async removeCategoryInProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne({ where: { id: productId }, relations: ['categories'] });
        product.categories = product.categories.filter(category => category.id !== categoryId);
        return this.productRepository.save(product);
    }

    async addCategoryInProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne({ where: { id: productId }, relations: ['categories'] });
        const category = await this.categoriesRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new NotFoundException(`Category #${categoryId} not found.`);
        }
        product.categories.push(category);
        return this.productRepository.save(product);
    }

    remove(id: number) {
        return this.productRepository.delete(id);
    }
}
