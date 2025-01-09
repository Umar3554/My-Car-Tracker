import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'locations' })
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'point', nullable: false })
  coordinates: string;
  @Column()
  radius: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
  @OneToOne(() => User, (user) => user.location, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' }) // Specifies the foreign key column
  user: User;
}
