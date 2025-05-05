import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";

export type FavoriteRoomDocument = FavoriteRoom & Document;

@Schema({ timestamps: true })
export class FavoriteRoom {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: mongoose.Types.ObjectId | User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true })
    room: mongoose.Types.ObjectId | Room

}

export const FavoriteRoomSchema = SchemaFactory.createForClass(FavoriteRoom);