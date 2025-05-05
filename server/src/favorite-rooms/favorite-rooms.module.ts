import { Module } from '@nestjs/common';
import { FavoriteRoomsService } from './favorite-rooms.service';
import { FavoriteRoomsController } from './favorite-rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteRoom, FavoriteRoomSchema } from './entities/favorite-room.entity';

@Module({
  imports: [ MongooseModule.forFeature([
      { name: FavoriteRoom.name, schema: FavoriteRoomSchema },
  ])],
  controllers: [FavoriteRoomsController],
  providers: [FavoriteRoomsService],
})
export class FavoriteRoomsModule {}
