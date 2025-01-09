// src/notifications/entities/notification.entity.ts
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alert: string; // The content of the notification

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Many notifications can belong to one user
  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: 'CASCADE', // When user is deleted, also delete their notifications
  })
  @JoinColumn({ name: 'userId' }) // The foreign key column in the notification table
  user: User;
}
