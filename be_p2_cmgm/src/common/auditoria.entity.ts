import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class Auditoria {
  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_modificacion: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  fecha_eliminacion: Date;
}
