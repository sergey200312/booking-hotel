import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { ReviewModule } from './review/review.module';
import { BookingModule } from './booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteRoomsModule } from './favorite-rooms/favorite-rooms.module';


@Module({
  imports: [MongooseModule.forRoot
    ('mongodb+srv://admin:admin@cluster0.ri0yp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
     AuthModule,
     RoomModule,
     ReviewModule,
     BookingModule,
     FavoriteRoomsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
