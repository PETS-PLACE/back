import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Petshop } from 'src/petshop/entities/petshop.entity';
import { Service } from './entities/service.entity';
import { Request} from 'express';

@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Petshop)
    private petshopsRepositorio: Repository<Petshop>,
    @InjectRepository(Service)
    private servicesRepositorio: Repository<Service>
  ){}

  async create(createServiceDto: CreateServiceDto) {
    try {
      
      //Verifica se o petshop indicado existe
      const findPetShop = await this.petshopsRepositorio.find({
        where:{
          id: createServiceDto.petShopId
        }
      })

      if(findPetShop.length == 0){
        return {
          status: 400,
          message: 'PetShop não encontrado.'
        }
      }

      //Se o petshop cria uma nova categoria de serviço que não está entre a lista padrão
      if(createServiceDto.description && createServiceDto.cost){

        //Verifica se o serviço indicado já está cadastrado
        const findService = await this.servicesRepositorio.find({
          where:{
            name: createServiceDto.name
          }
        })

        if(findService.length > 0){
          return {
            status: 400,
            message: 'Serviço já cadastrado.'
          }
        }

        const addService = this.servicesRepositorio.create({
          name: createServiceDto.name,
          description: createServiceDto.description,
          cost: createServiceDto.cost,
          proprietary: createServiceDto.petShopId
        })
  
        addService.petShops = findPetShop
  
        const result = await this.servicesRepositorio.save(addService)
  
        return{
          status: 200,
          result
        }
      }

      //Associa um serviço padrão ao petshop indicado
      else{
        //Verifica se o serviço indicado existe
        const findService = await this.servicesRepositorio.find({
          where:{
            name: createServiceDto.name
          }
        })

        if(findService.length == 0){
          return {
            status: 400,
            message: 'Serviço não encontrado.'
          }
        }
      
        findService[0].petShops = findPetShop

        const result = await this.servicesRepositorio.save(findService)
        return{
          status: 200,
          result
        }
      }

    } catch (error) {
      console.error(error);
      return{
        status:500,
        message: 'Devido a um erro interno não foi possível realizar o cadastro do serviço.'
      }
    }
  }

  async findAll(request: Request) {
    try {
      const petShopId = Number(request.query.petShopId)
      
      const result = await this.petshopsRepositorio.find({
        where: {
          id: petShopId
        },
        relations:{
          services: true
        }
      })

      if(result.length == 0){
        return{
          status: 400,
          message: 'Nenhum serviço encontrado.'
        }
      }

      return{
        status: 200,
        result
      }

    } catch (error) {
      console.error(error);
      return{
        status:500,
        message: 'Devido a um erro interno não foi possível listar os serviço.'
      }
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const findPetShop = await this.petshopsRepositorio.find({
        where:{
          id: updateServiceDto.petShopId
        }
      })
  
      if(findPetShop.length == 0){
        return {
          status: 400,
          message: 'PetShop não encontrado.'
        }
      }
  
      const findService = await this.servicesRepositorio.find({
        where:{
          id
        },
        relations:{
          petShops: true
        }
      })
  
      if(findService.length == 0){
        return {
          status: 400,
          message: 'Serviço não encontrado.'
        }
      }
  
      //Verifica se o id do petshop é o proprietário do serviço indicado para poder altera-lo
      if(findService[0].proprietary === updateServiceDto.petShopId){

        const {name, description, cost} = updateServiceDto

        await this.servicesRepositorio.update(id, {name, description, cost})
        return{
          status: 200,
          message: 'Serviço atualizado com sucesso.'
        }
      }
  
      else{
        return{
          status: 400,
          message: 'Este petshop não tem permição para alterar esse serviço.'
        }
      }
    } catch (error) {
      console.error(error)
      return{
        status: 500,
        message: 'Devido a uma erro interno não possível alterar o serviço.'
      }
    }
    
  }

  async remove(request:Request) {
    try {
      const petShopId = Number(request.query.petShopId)
      const serviceId = Number(request.query.serviceId)
      const findPetShop = await this.petshopsRepositorio.find({
        where:{
          id: petShopId
        }
      })
  
      if(findPetShop.length == 0){
        return {
          status: 400,
          message: 'PetShop não encontrado.'
        }
      }
  
      const findService = await this.servicesRepositorio.find({
        where:{
          id: serviceId
        }
      })
  
      if(findService.length == 0){
        return {
          status: 400,
          message: 'Serviço não encontrado.'
        }
      }

      //Um serviço só será deletado pelo petshop que o criou
      if(findService[0].proprietary === petShopId){
        await this.servicesRepositorio.delete(serviceId)
        return{
          status: 200,
          message: 'Serviço deletado com sucesso.'
        }
      }

      else{
        return{
          status: 400,
          message: 'Esse petshop não tem permição para deletar este serviço.'
        }
      }

    } catch (error) {
      console.error(error)
      return{
        status: 500,
        message: 'Devido a um erro interno não foi possível deletar este serviço.'
      }
    }
  }
}
