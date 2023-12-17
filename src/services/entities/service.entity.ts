import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Petshop } from "src/petshop/entities/petshop.entity";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar',{length: 255})
    name: string

    @Column('text')
    description: string

    @Column({type: 'decimal', precision:10, scale: 2})
    cost: number

    @Column()
    proprietary: number

    @CreateDateColumn({name: 'created_at'})
    createAt: string

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:string

    @ManyToMany(() => Petshop, petShop => petShop.services)
    petShops: Petshop[];
}
