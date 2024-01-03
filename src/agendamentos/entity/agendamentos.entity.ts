import {
  Entity, Column,
  CreateDateColumn, UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Petshop } from "src/petshop/entities/petshop.entity";;
import { Client } from "src/clients/entities/client.entity";
import { Service } from "src/services/entities/service.entity";
import { Animais } from "src/animais/entity/animais.entity";

@Entity()
export class Agendamentos {

  @PrimaryGeneratedColumn()
  id: number;

  //executor da ação
  @ManyToOne( () => Petshop, (petshop) => petshop.agendamentos )
  petshop: Petshop;

  //requisitador da ação (cliente)
  @ManyToOne( () => Client, (client) => client.agendamentos )
  cliente: Client;

  //servicos alvo do cliente
  @ManyToOne( () => Service, (service) => service.agendamentos )
  servico: Service;

  //sofredor da ação
  @ManyToOne( () => Animais, (animais) => animais.agendamentos )
  animal: Animais;

  @CreateDateColumn({name: 'created_at'})
  createAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt:string;

};
