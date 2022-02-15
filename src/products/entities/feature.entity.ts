import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";

@Entity()
export class Feature extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 50
    })
    name: string

    @Column({
        type: "float",
        precision: 1,
        scale: 1
    })
    'price_coefficient': string

    @ManyToMany(type => Product, products => products.features)
    products: Product[]
}