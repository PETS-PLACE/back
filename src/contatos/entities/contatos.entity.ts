import {
  Entity, Column,
  CreateDateColumn, UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Petshop } from "src/petshop/entities/petshop.entity";;

/* Evitando dependências circulares entre módulo petshop e contato */

/** Armazena uma informação de contato*/
@Entity()
export class Contatos {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length: 255, nullable: false})
  info: string;

  @ManyToOne( () => Petshop, (petshop) => petshop.contatos )
  petshop: Petshop;

  @CreateDateColumn({name: 'created_at'})
  createAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt:string;

};

