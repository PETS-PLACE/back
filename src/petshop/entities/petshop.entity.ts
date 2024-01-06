import {
  Entity, Column,
  CreateDateColumn, UpdateDateColumn,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Contatos } from "src/contatos/entities/contatos.entity";;
import { Service } from "src/services/entities/service.entity";
import { Agendamentos } from "src/agendamentos/entity/agendamentos.entity";

@Entity()
@Unique(['cnpj'])
export class Petshop {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{length: 255})
    nome: string;

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

    @Column("varchar", {length: 255})
    email: string

    @Column()
    password: string;

    @OneToMany( () => Contatos, (contatos) => contatos.petshop )
    contatos: Contatos[];

    @CreateDateColumn({name: 'created_at'})
    createAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:string;

    @ManyToMany(() => Service, service => service.petShops)
    @JoinTable()
    services: Service[];

    @OneToMany( () => Agendamentos, (agendamentos) => agendamentos.servico )
    agendamentos: Agendamentos[];
};

