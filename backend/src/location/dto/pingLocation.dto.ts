import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PingLocationDto {
  @IsNotEmpty()
  @IsNumber()
  longitude: number;
  @IsNotEmpty()
  @IsNumber()
  latitude: number;
  @IsNotEmpty()
  @IsString()
  carNumber: string;
}
