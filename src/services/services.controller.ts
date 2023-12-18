import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Request, Response } from 'express';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto, @Res() response: Response) {
    const result = await this.servicesService.create(createServiceDto);
    return response.status(result.status).json(result)
  }

  @Get()
  async findAll(@Res() response: Response, @Req() request: Request) {
    const result = await this.servicesService.findAll(request);
    return response.status(result.status).json(result)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto, @Res() response: Response) {
    const result = await this.servicesService.update(+id, updateServiceDto);
    return response.status(result.status).json(result)
  }

  @Delete()
  async remove( @Res() response: Response, @Req() request: Request) {
    const result = await this.servicesService.remove(request);
    return response.status(result.status).json(result)
  }
}
