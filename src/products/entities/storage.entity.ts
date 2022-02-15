import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";

@Entity()
export class StoragePlace extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        length: 100
    })
    country: string

    @Column({
        nullable: false,
        length: 200
    })
    city: string

    @Column({
        nullable: false,
        length: 200
    })
    street: string

    @Column({
        nullable: false,
        length: 100
    })
    house: string

    @OneToMany(type => Cell, cells => cells.storagePlace)
    cells: Cell[]
}

@Entity()
export class Cell extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "decimal",
        nullable: false,
        comment: "Ширина в сантиметрах"
    })
    width: number

    @Column({
        type: "decimal",
        nullable: false,
        comment: "Высота в сантиметрах"
    })
    height: number

    @Column({
        type: "decimal",
        nullable: false,
        comment: "Длина в сантиметрах"
    })
    length: number

    @ManyToOne(type => StoragePlace, storagePlace => storagePlace.cells)
    storagePlace: StoragePlace

    @OneToMany(type => ProductToCell, productToCells => productToCells.cell)
    productToCells: ProductToCell[]
}

@Entity()
export class ProductToCell extends  BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Product, product => product.productToCells, {
        nullable: false
    })
    product: Product

    @ManyToOne(type => Product, cell => cell.productToCells, {
        nullable: false
    })
    cell: Cell

    @Column({
        type: 'datetime'
    })
    'receipt_date': string

    @Column({
        type: 'datetime'
    })
    'shipping_date': string

    @Column()
    quantity: number
}

