import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Petshop } from './entities/petshop.entity';
import { CreatePetshopDto } from './dto/create-petshop.dto';
import { UpdatePetshopDto } from './dto/update-petshop.dto';


@Injectable()
export class PetshopService {

  constructor(
    @InjectRepository(Petshop)
    private petshopsRepositorio: Repository<Petshop>
  ){

  }

  async salvarDadosPetshop( createPetshopDto: CreatePetshopDto )
  {
    try {
      const createPetshop = this.petshopsRepositorio.create({
        nome: createPetshopDto.nome,
        cnpj:     createPetshopDto.cnpj,
        rua:      createPetshopDto.rua,
        numero:   createPetshopDto.numero,
        bairro:   createPetshopDto.bairro,
        cidade:   createPetshopDto.cidade,
        estado:   createPetshopDto.estado,
        email:    createPetshopDto.email,
        password: createPetshopDto.password,
      });
      
      const result = await this.petshopsRepositorio.save( createPetshop );
      return{
        status: 200,
        result
      }

    } catch (error) {
      return{
        status: 500,
        message: 'Devido a um erro interno não foi possível realizar o cadastro.'
      }
    }
    
  }

  async findAll(){
    try {
      const result = await this.petshopsRepositorio.find()

      if(result.length == 0){
        return{
          status:400,
          message: 'Nenhum pet shop encontrado'
        }
      }

      return{
        status: 200,
        result
      }

    } catch (error) {
      return{
        status: 500,
        message: 'Devido a um erro interno não foi possível listar os pets shops'
      }
    }
  }

  /** Retorna um usário pelo id absoluto. CreateClient.
   *  @param {number} id - id do pet shop.
  * */
  async findOne(id: number){
    try {
      const result = await this.petshopsRepositorio.findBy({id})

      if(result.length <= 0){
        return{
          status:400,
          message: 'Pet shop não encontrado.'
        }
      }

      return{
        status: 200,
        result
      }

    } catch (error) {
      return{
        status: 500,
        message: 'Devido a um erro interno não foi possível encontrar o pet shop.'
      }
    }
  }

  async update(id: number, updatePetshopDto: UpdatePetshopDto){
    try {
      const findPetShop = await this.petshopsRepositorio.findBy({id})

      if(findPetShop.length > 0){
        await this.petshopsRepositorio.update(id, updatePetshopDto)
        return{
          status:200,
          message: 'Atualização realizada com sucesso.'
        }
      }

      else{
        return{
          status: 400,
          message: 'Pet shop não encontrado.'
        }
      }
    } catch (error) {
      return{
        status: 500,
        message: 'Devido a um erro interno não foi possível realizar a atualização.'
      }
    }
  }

  async remove(id:number){
    try {
      const findPetShop = await this.petshopsRepositorio.findBy({id})

      if(findPetShop.length > 0){
        await this.petshopsRepositorio.delete(id)
        return{
          status:200,
          message: 'Pet shop excluído com sucesso.'
        }
      }

      else{
        return{
          status: 400,
          message: 'Pet shop não encontrado.'
        }
      }
    } catch (error) {
      return{
        status: 500,
        message: 'Devido a um erro interno não foi possível excluir o pet shop'
      }
    }
  }

}
