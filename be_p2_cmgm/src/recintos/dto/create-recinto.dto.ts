import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateRecintoDto {
  @ApiProperty({ example: 'Teatro Gran Mariscal' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'Sucre' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ciudad: string;

  @ApiPropertyOptional({ example: 800 })
  @IsOptional()
  @IsInt()
  @Min(1)
  aforo_maximo?: number;
}
