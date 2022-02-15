import {EntityRepository, Repository, getRepository} from "typeorm";
import {Product} from "./entities/product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {Category} from "./entities/category.entity";
import {NotFoundException} from "@nestjs/common";
import {Feature} from "./entities/feature.entity";
import {ProductsFilterDto} from "./dto/products-filter.dto";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{

    public async getAll(filterDto: ProductsFilterDto): Promise<Product[]> {
        const {search, itemsCount, orderField, orderParam, page} = filterDto
        const query =  await this
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.features', 'features')
        if(search) {
            query.where('product.name like :search or product.description like :search', {search: `%${search}%`})
        }
        const products = await query.getMany()
        return products
    }

    public async getCategoryById(id: number): Promise<Category> {
        const found = await getRepository(Category).findOne(id)
        if (!found) {
            throw new NotFoundException(`Category by id ${id} does not exists`)
        }
        return found
    }

    public async getFeaturesById(ids: number[]): Promise<Feature[]> {
        const found = await getRepository(Feature).findByIds(ids, {relations: ['products']})
        if (!found) {
            throw new NotFoundException(`Features does not exists`)
        }
        return found
    }

    public async getProductById(id: number): Promise<Product> {
        const product = await this.createQueryBuilder('product')
            .leftJoinAndSelect("product.features", "feature")
            .leftJoinAndSelect("product.category", "category")
            .where('product.id = :uid', {uid: id}).getOne()
        if (!product) {
            throw new NotFoundException(`Features does not exists`)
        }
        return product
    }

    public async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const {
            vendor_code,
            description,
            name,
            categoryId,
            features,
            size
        } = createProductDto

        await this.getCategoryById(categoryId)

        const product = new Product()
        product.width = size.width
        product.height = size.height
        product.length = size.length
        product.vendor_code = vendor_code
        product.categoryId = categoryId
        product.description = description
        product.features = await this.getFeaturesById(
            features.map(feature => feature.id)
        )
        product.name = name
        const addedProduct = await this.save(product)
        return await this.getProductById(addedProduct.id)
    }
}