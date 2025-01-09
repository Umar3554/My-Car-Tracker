import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async findAll() {
    return await this.notificationRepository.find();
  }
  async findAllbyId(userId: string) {
    return await this.notificationRepository.find({
      where: { user: { id: userId } },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    return await this.notificationRepository.findOne({ where: { id } });
  }
  async remove(id: string) {
    return await this.notificationRepository.softDelete(id);
  }
}
