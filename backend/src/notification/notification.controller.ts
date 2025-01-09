import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/location/guards/auth/auth.guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req) {
    const userId = req['userId'];
    return this.notificationService.findAllbyId(userId);
  }
}
