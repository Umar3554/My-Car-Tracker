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
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';
import { AuthGuard } from './guards/auth/auth.guard';
import { PingLocationDto } from './dto/pingLocation.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { FilesFieldInterceptor } from 'src/uploader/files-field.interceptor';
// import { FileInterceptor } from '@nestjs/platform-express';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('add-location')
  async addLocation(
    @Req() req,
    @Body() locationDto: LocationDto,
  ): Promise<{ message: string }> {
    const userId = req['userId'];
    const location = await this.locationService.addLocation(
      locationDto,
      userId,
    );
    return { message: 'Car location added' };
  }
  @Post('ping-location')
  async pingLocation(
    @Body() pingLocationDto: PingLocationDto,
  ): Promise<{ message: string }> {
    const pingLocation =
      await this.locationService.pingLocation(pingLocationDto);
    return { message: 'Car location pinged successfully' };
  }
}
