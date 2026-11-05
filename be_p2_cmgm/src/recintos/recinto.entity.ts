import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Auditoria } from '../common/auditoria.entity';
import { EventoCultural } from '../eventos-culturales/evento-cultural.entity';

@Entity('recintos')
export class Recinto extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  ciudad: string;

  @Column({ type: 'int', nullable: true })
  aforo_maximo: number;

  @OneToMany(() => EventoCultural, (evento) => evento.recinto)
  eventos: EventoCultural[];
}
