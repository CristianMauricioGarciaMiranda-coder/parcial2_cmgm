import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auditoria } from '../common/auditoria.entity';
import { Recinto } from '../recintos/recinto.entity';

export enum EstadoEvento {
  Programado = 'Programado',
  Agotado = 'Agotado',
  Cancelado = 'Cancelado',
}

export enum CategoriaEvento {
  Concierto = 'concierto',
  Teatro = 'Teatro',
  Danza = 'Danza',
  Festival = 'Festival',
}

@Entity('eventos_culturales')
@Check('"estado" IN (\'Programado\', \'Agotado\', \'Cancelado\')')
@Check('"categoria_evento" IN (\'concierto\', \'Teatro\', \'Danza\', \'Festival\')')
export class EventoCultural extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  id_recinto: number;

  @ManyToOne(() => Recinto, (recinto) => recinto.eventos, { nullable: false })
  @JoinColumn({ name: 'id_recinto' })
  recinto: Recinto;

  @Column({ type: 'varchar', length: 150, nullable: false })
  titulo: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  artista_principal: string;

  @Column({ type: 'int', nullable: false })
  duracion_minutos: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  precio_entrada: number;

  @Column({ type: 'date', nullable: false })
  fecha_evento: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  estado: EstadoEvento;

  @Column({ type: 'varchar', length: 20, nullable: false, default: CategoriaEvento.Concierto })
  categoria_evento: CategoriaEvento;
}
