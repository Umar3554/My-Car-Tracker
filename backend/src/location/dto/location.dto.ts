import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsString()
  longitude: string;
  @IsNotEmpty()
  @IsString()
  latitude: string;
  @IsNotEmpty()
  @IsNumber()
  radius: number;
}
