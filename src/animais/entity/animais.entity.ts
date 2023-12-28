import {
  Entity, Column,
  CreateDateColumn, UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Client } from "src/clients/entities/client.entity";


@Entity()
export class Animais {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length: 255, nullable: false})
  nome: string;

  @Column('varchar',{length: 32, nullable: false})
  especie: string;

  @Column({nullable: false})
  idade: number;

  @Column('decimal',{nullable: false})
  peso: number;

  @ManyToOne( () => Client, (Client) => Client.animais,{nullable: false} )
  cliente: Client;

  @CreateDateColumn({name: 'created_at',nullable: false})
  createAt: string;

  @UpdateDateColumn({name: 'updated_at',nullable: false})
  updatedAt:string;

};


