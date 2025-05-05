
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking, BookingSchema } from './entities/booking.entity';
import { Room, RoomSchema } from 'src/room/entities/room.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: Booking.name, schema: BookingSchema },
    { name: Room.name, schema: RoomSchema },
    { name: User.name, schema: UserSchema },
  ]),],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
