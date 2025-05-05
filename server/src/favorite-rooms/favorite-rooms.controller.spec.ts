import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteRoomsController } from './favorite-rooms.controller';
import { FavoriteRoomsService } from './favorite-rooms.service';

describe('FavoriteRoomsController', () => {
  let controller: FavoriteRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteRoomsController],
      providers: [FavoriteRoomsService],
    }).compile();

    controller = module.get<FavoriteRoomsController>(FavoriteRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
