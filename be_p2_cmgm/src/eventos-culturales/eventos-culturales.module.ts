import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoCultural } from './evento-cultural.entity';
import { EventosCulturalesService } from './eventos-culturales.service';
import { EventosCulturalesController } from './eventos-culturales.controller';
import { RecintosModule } from '../recintos/recintos.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventoCultural]), RecintosModule],
  controllers: [EventosCulturalesController],
  providers: [EventosCulturalesService],
})
export class EventosCulturalesModule {}
