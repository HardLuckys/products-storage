import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Feature} from "./feature.entity";
import {Category} from "./category.entity";
import {Photo} from "./photos.entity";
import {Shipment} from "./shipment.entity";
import {ProductToCell} from "./storage.entity";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number


    @Column({
        length: 45,
        nullable: false
    })
    'vendor_code': string


    @Column({
        length: 100,
        nullable: false
    })
    name: string


    @Column({
        length: 500,
        nullable: true
    })
    description: string


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


    @Column({select: false})
    categoryId: number
    @ManyToOne(type => Category, category => category.products, {
        eager: true,
        nullable: false
    })
    @JoinColumn({name: 'categoryId'})
    category: Category


    @OneToMany(type => Photo, photos => photos.product)
    photos: Photo[]

    @ManyToMany(type => Shipment, shipments => shipments.products)
    @JoinTable()
    shipments: Shipment[]


    @OneToMany(type => ProductToCell, productToCells => productToCells.product)
    productToCells: ProductToCell

    @ManyToMany(type => Feature, features => features.products)
    @JoinTable()
    features: Feature[]
}