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

  @Column('varchar',{length: 255})
  nome: string;

  @Column('string',{length: 32})
  especie: string;

  @Column('number')
  idade: number;

  @Column('number')
  peso: number;

  @ManyToOne( () => Client, (Client) => Client.animais )
  clientes: Client;

  @CreateDateColumn({name: 'created_at'})
  createAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt:string;

};


