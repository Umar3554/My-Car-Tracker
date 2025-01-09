import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './db/typeorm';
import { IsUniqueConstraint } from './constraints/is-unique-constraint';
import { AuthModule } from './user/auth/auth.module';
import { MomentModule } from '@ccmos/nestjs-moment';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './uploader/multer.config';
import { LocationModule } from './location/location.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    MomentModule.forRoot({
      tz: 'Asia/Karachi',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
    UserModule,
    AuthModule,
    LocationModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
