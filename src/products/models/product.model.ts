import {ProductsService} from "../products.service";
import {CreateProductDto} from "../dto/create-product.dto";
import {Product} from "../entities/product.entity";
import {ProductsFilterDto} from "../dto/products-filter.dto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ProductModel {
    constructor(
        readonly productsService: ProductsService
    ) {}

    public async create(creteProductDto: CreateProductDto): Promise<Product> {
        return await this.productsService.createProduct(creteProductDto)
    }

    public async getAll(filterDto: ProductsFilterDto): Promise<Product[]> {
        return await this.productsService.getProducts(filterDto)
    }
}