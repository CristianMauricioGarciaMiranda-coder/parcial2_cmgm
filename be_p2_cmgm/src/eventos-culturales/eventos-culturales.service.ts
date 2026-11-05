import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoCultural } from './evento-cultural.entity';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto';
import { RecintosService } from '../recintos/recintos.service';

@Injectable()
export class EventosCulturalesService {
  constructor(
    @InjectRepository(EventoCultural) private readonly repo: Repository<EventoCultural>,
    private readonly recintosService: RecintosService,
  ) {}

  findAll() {
    return this.repo.find({ relations: { recinto: true }, order: { fecha_evento: 'ASC' } });
  }

  async findOne(id: number) {
    const evento = await this.repo.findOne({ where: { id }, relations: { recinto: true } });
    if (!evento) throw new NotFoundException(`Evento ${id} no encontrado`);
    return evento;
  }

  async create(dto: CreateEventoCulturalDto) {
    await this.recintosService.findOne(dto.id_recinto);
    const guardado = await this.repo.save(this.repo.create(dto));
    return this.findOne(guardado.id);
  }

  async update(id: number, dto: UpdateEventoCulturalDto) {
    const evento = await this.findOne(id);
    if (dto.id_recinto !== undefined) await this.recintosService.findOne(dto.id_recinto);
    delete evento.recinto;
    Object.assign(evento, dto);
    await this.repo.save(evento);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.softDelete(id);
    return { message: `Evento ${id} eliminado` };
  }
}
