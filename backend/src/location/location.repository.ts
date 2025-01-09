import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Location } from './entity/location.entity';
import { LocationDto } from './dto/location.dto';
import { User } from 'src/user/entities/user.entity';
import { PingLocationDto } from './dto/pingLocation.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class LocationRepository extends Repository<Location> {
  private logger = new Logger('LocationRepository');
  constructor(
    private dataSource: DataSource,
    private readonly userRepository: UserRepository,
  ) {
    super(Location, dataSource.createEntityManager());
  }
  async addLocation(locationDto: LocationDto, userId: string): Promise<void> {
    const { longitude, latitude, radius } = locationDto;
    const location = new Location();
    location.longitude = longitude;
    location.latitude = latitude;
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
    location.longitude = longitude;
    location.latitude = latitude;
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
  async pingLocation(pingLocationDto: PingLocationDto): Promise<void> {
    const { longitude, latitude, carNumber } = pingLocationDto;

    // Find the user and their associated location
    const user = await this.userRepository.findOne({
      where: { carNumber: carNumber },
      relations: ['location'],
    });

    if (!user || !user.location) {
      this.logger.warn(
        `User with car number ${carNumber} or their location not found.`,
      );
      throw new NotFoundException('User or location not found.');
    }

    // Extract location data
    const { radius } = user.location;
    const savedLongitude = user.location.longitude;
    const savedLatitude = user.location.latitude;

    try {
      // Calculate the distance between the two points using Haversine formula or MySQL spatial function
      const distance = this.calculateDistance(
        { latitude: savedLatitude, longitude: savedLongitude },
        { latitude, longitude },
      );
      console.log('From Database', savedLatitude, savedLongitude);
      console.log('From Api', latitude, longitude);
      // Check if the pinged location is outside the radius
      if (distance > radius) {
        this.logger.warn(`User ${user.id} is outside the allowed area.`);
        // Send an alert to the user via socket
        // this.socketService.alertUser(
        //   user.id,
        //   'You are outside the allowed area!',
        // );
      } else {
        this.logger.log(`User ${user.id} is within the allowed area.`);
      }
    } catch (error) {
      this.logger.error(
        `Error processing ping for user with car number ${carNumber}. Error: ${error.stack}`,
      );
      throw new InternalServerErrorException();
    }
  }
  private calculateDistance(
    point1: { latitude: number; longitude: number },
    point2: { latitude: number; longitude: number },
  ): number {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const R = 6371e3; // Earth's radius in meters
    const lat1 = toRadians(point1.latitude);
    const lat2 = toRadians(point2.latitude);
    const deltaLat = toRadians(point2.latitude - point1.latitude);
    const deltaLon = toRadians(point2.longitude - point1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }
}
