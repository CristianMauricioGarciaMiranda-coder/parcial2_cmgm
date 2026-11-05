import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recinto } from './recinto.entity';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';

@Injectable()
export class RecintosService {
  constructor(@InjectRepository(Recinto) private readonly repo: Repository<Recinto>) {}

  findAll() {
    return this.repo.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number) {
    const recinto = await this.repo.findOne({ where: { id } });
    if (!recinto) throw new NotFoundException(`Recinto ${id} no encontrado`);
    return recinto;
  }

  create(dto: CreateRecintoDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateRecintoDto) {
    const recinto = await this.findOne(id);
    Object.assign(recinto, dto);
    return this.repo.save(recinto);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.softDelete(id);
    return { message: `Recinto ${id} eliminado` };
  }
}
