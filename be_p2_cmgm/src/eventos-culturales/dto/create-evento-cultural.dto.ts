import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { CategoriaEvento, EstadoEvento } from '../evento-cultural.entity';

export class CreateEventoCulturalDto {
  @ApiProperty({ example: 1, description: 'Id del recinto donde se realiza' })
  @IsInt()
  id_recinto: number;

  @ApiProperty({ example: 'Noche de folklore' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo: string;

  @ApiProperty({ example: 'Los Kjarkas' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  artista_principal: string;

  @ApiProperty({ example: 120 })
  @IsInt()
  @Min(1)
  duracion_minutos: number;

  @ApiProperty({ example: 50.5 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio_entrada: number;

  @ApiProperty({ example: '2026-12-15' })
  @IsDateString()
  fecha_evento: string;

  @ApiProperty({ enum: EstadoEvento, example: EstadoEvento.Programado })
  @IsEnum(EstadoEvento)
  estado: EstadoEvento;

  @ApiProperty({ enum: CategoriaEvento, example: CategoriaEvento.Concierto })
  @IsEnum(CategoriaEvento)
  categoria_evento: CategoriaEvento;
}
