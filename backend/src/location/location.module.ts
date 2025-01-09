import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationRepository } from './location.repository';
import { Location } from './entity/location.entity';
import { UserRepository } from 'src/user/user.repository';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [
    LocationService,
    LocationRepository,
    UserRepository,
    SocketGateway,
  ],
})
export class LocationModule {}
