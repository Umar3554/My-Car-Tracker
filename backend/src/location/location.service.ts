import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async findAll() {
    return await this.locationRepository.find();
  }

  async findOne(id: string) {
    return await this.locationRepository.findOne({ where: { id } });
  }

  async addLocation(locationDto: LocationDto, userId: string) {
    const locationExists = await this.locationRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (locationExists) {
      console.log('old:', locationExists);
      const { longitude, latitude, radius } = locationDto;
      locationExists.coordinates = `POINT(${longitude} ${latitude})`;
      locationExists.radius = radius;
      console.log('new:', locationExists);
      return await locationExists.save();
    } else {
      return await this.locationRepository.addLocation(locationDto, userId);
    }
  }

  async remove(id: string) {
    return await this.locationRepository.softDelete(id);
  }
}
