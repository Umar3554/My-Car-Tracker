import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Notification } from './entity/notification.entity';
@Injectable()
export class NotificationRepository extends Repository<Notification> {
  private logger = new Logger('NotificationRepository');
  constructor(private dataSource: DataSource) {
    super(Notification, dataSource.createEntityManager());
  }
}
