import mongoose, { Model } from 'mongoose';
import { FavoriteRoom, FavoriteRoomDocument } from './entities/favorite-room.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class FavoriteRoomsService {
  constructor(
    @InjectModel(FavoriteRoom.name) private favoriteRoomModel: Model<FavoriteRoomDocument>,
  ) { }
  async toggle(userId: string, roomId: string) {

    const checkFavoriteRoom = await this.favoriteRoomModel.findOne({ user: userId, room: roomId })

    if (checkFavoriteRoom) {
      await checkFavoriteRoom.deleteOne({ _id: checkFavoriteRoom._id })

      return { checkFavoriteRoom, message: 'Номер был удален из понравившихся' }
    }

    const newFavoriteRoom = await this.favoriteRoomModel.create({
      user: userId,
      room: roomId
    })

    return { message: 'Номер был добавлен в понравившиеся', newFavoriteRoom }
  }

  async findAll(userId: string) {
    const favoriteRooms = await this.favoriteRoomModel.find({ user: userId }).populate('room').exec()

    if (!favoriteRooms || favoriteRooms.length === 0 ) {
      return { message: 'Список понравившихся номеров пуст'}
    }

    return { favoriteRooms }
  }

  async isFavorite(userId: string, roomId: string) {
    const isFavorite = await this.favoriteRoomModel.findOne({ user: userId, room: roomId });
    return { isFavorite };
  }
 
}
