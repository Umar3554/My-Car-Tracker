import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Location } from './entity/location.entity';
import { LocationDto } from './dto/location.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LocationRepository extends Repository<Location> {
  private logger = new Logger('LocationRepository');
  constructor(private dataSource: DataSource) {
    super(Location, dataSource.createEntityManager());
  }
  async addLocation(locationDto: LocationDto, userId: string): Promise<void> {
    const { longitude, latitude, radius } = locationDto;
    const location = new Location();
    location.coordinates = `POINT(${longitude} ${latitude})`;
    location.radius = radius;
    const user = new User();
    user.id = userId;
    location.user = user;
    try {
      await location.save();
    } catch (error) {
      this.logger.error(
        `There was some error in creating user. Date: ${JSON.stringify(locationDto)}, error: ${error.stack}`,
      );
      throw new InternalServerErrorException();
    }
  }
  async updateLocation(
    locationDto: LocationDto,
    userId: string,
  ): Promise<void> {
    const { longitude, latitude, radius } = locationDto;
    const location = new Location();
    location.coordinates = `POINT(${longitude} ${latitude})`;
    location.radius = radius;
    const user = new User();
    user.id = userId;
    location.user = user;
    try {
      await location.save();
    } catch (error) {
      this.logger.error(
        `There was some error in creating user. Date: ${JSON.stringify(locationDto)}, error: ${error.stack}`,
      );
      throw new InternalServerErrorException();
    }
  }
}
