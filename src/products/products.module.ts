import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { Product } from './entities/product.entity';
import { BrandsController } from './controllers/brands/brands.controller';
import { Brand } from './entities/brand.entity';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsService } from './services/brands/brands.service';
import { CategoriesService } from './services/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand])],
  exports: [ProductsService],
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, BrandsService, CategoriesService]
})
export class ProductsModule { }
