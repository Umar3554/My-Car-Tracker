import { IsNotEmpty, IsNumber } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsNumber()
  longitude: number;
  @IsNotEmpty()
  @IsNumber()
  latitude: number;
  @IsNotEmpty()
  @IsNumber()
  radius: number;
}
