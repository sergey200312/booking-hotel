import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FavoriteRoomsService } from './favorite-rooms.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ICurrentUser } from 'src/types/types';
import { ToggleFavoriteRoomDto } from './dto/toggle-favoriteRoom.dto';

@Controller('favorite-rooms')
export class FavoriteRoomsController {
  constructor(private readonly favoriteRoomsService: FavoriteRoomsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  toggle(@Body() toggleFavoriteRoomDto: ToggleFavoriteRoomDto , @CurrentUser() user: ICurrentUser) {
    return this.favoriteRoomsService.toggle(user.id, toggleFavoriteRoomDto.roomId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: ICurrentUser) {
    return this.favoriteRoomsService.findAll(user.id);
  }

  @Get(':roomId')
  @UseGuards(JwtAuthGuard)
  isFavorite(@CurrentUser() user: ICurrentUser, @Param('roomId') roomId: string) {
    return this.favoriteRoomsService.isFavorite(user.id, roomId)
  }


}
