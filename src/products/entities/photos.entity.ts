import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";

@Entity()
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 300,
        nullable: false
    })
    path: string

    @ManyToOne(type => Product, product => product.photos, {
        eager: true,
        nullable: false
    })
    product: Product
}