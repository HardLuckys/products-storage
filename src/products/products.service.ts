import { Injectable } from '@nestjs/common';
import {ProductRepository} from "./products.repository";
import {Product} from "./entities/product.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateProductDto} from "./dto/create-product.dto";
import {ProductsFilterDto} from "./dto/products-filter.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository
    ) {}

    async getProducts(filterDto: ProductsFilterDto): Promise<Product[]> {
        return await this.productRepository.getAll(filterDto)
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productRepository.createProduct(createProductDto)
    }
}