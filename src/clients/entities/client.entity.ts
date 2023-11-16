import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
//O campo cpf deve ser unico
@Unique(['cpf'])
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar',{length: 255})
    nome: string

    @Column('varchar',{length: 11})
    cpf: string

    @Column('varchar',{length:128})
    rua: string

    @Column('int')
    numero: number

    @Column('varchar',{length: 255})
    bairro: string

    @Column('varchar',{length: 255})
    cidade: string

    @Column('varchar',{length: 255})
    estado: string

    @Column("varchar", {length: 255})
    email: string

    @Column()
    password: string

    @CreateDateColumn({name: 'created_at'})
    createAt: string

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:string
}
