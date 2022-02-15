import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    name: string

    @Column({
        length:  300,
        nullable: true
    })
    description: string

    @OneToMany(type => Product, products => products.category)
    products: Product[]


}