import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '../user-roles.enum';
import { Location } from '../../location/entity/location.entity';

@Entity({ name: 'users' })
@Unique(['email', 'deletedAt'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column({ select: false })
  password: string;
  @Column({ select: false })
  carName: string;
  @Column({ select: false })
  carNumber: string;
  @Column({ select: false })
  salt: string;
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
  @OneToOne(() => Location, (location) => location.user, { cascade: true })
  location: Location;
}
