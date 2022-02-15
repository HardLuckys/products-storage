import {Body, Controller, Get, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {Product} from "./entities/product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {ProductsFilterDto} from "./dto/products-filter.dto";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    createProduct(@Body() creteProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.createProduct(creteProductDto)
    }

    @Get()
    getProducts(@Query(ValidationPipe) filterDto: ProductsFilterDto): Promise<Product[]> {
        return this.productsService.getProducts(filterDto)
    }

}