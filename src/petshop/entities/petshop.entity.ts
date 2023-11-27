import {  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
          Unique, UpdateDateColumn
} from "typeorm";

@Entity()
@Unique(['cnpj'])
export class Petshop {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{length: 255})
    nomeComercial: string;

    @Column('varchar',{length: 14})
    cnpj: string;

    @Column('varchar',{length:128})
    rua: string;

    @Column('int')
    numero: number;

    @Column('varchar',{length: 255})
    bairro: string;

    @Column('varchar',{length: 255})
    cidade: string;

    @Column('varchar',{length: 255})
    estado: string;

    @Column()
    password: string;

    @CreateDateColumn({name: 'created_at'})
    createAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:string;
};

