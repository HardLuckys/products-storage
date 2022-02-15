import {BaseEntity, Column, Entity, ManyToMany,  PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";

@Entity()
export class Shipment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    supplier: string

    @Column({
        nullable: false,
        type: "datetime"
    })
    date: string

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    'purchase_price': number

    @Column({
        nullable: false,
        type: "decimal",
        precision: 10,
        scale: 2
    })
    'retail_price': number

    @Column({
        nullable: false,
    })
    quantity: number

    @ManyToMany(() => Product, products => products.shipments)
    products: Product[]
}