import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { BrandsController } from './controllers/brands/brands.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsService } from './services/brands/brands.service';
import { CategoriesService } from './services/categories/categories.service';

@Module({
  exports: [ProductsService],
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, BrandsService, CategoriesService]
})
export class ProductsModule { }
