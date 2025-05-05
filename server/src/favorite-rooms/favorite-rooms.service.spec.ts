import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteRoomsService } from './favorite-rooms.service';

describe('FavoriteRoomsService', () => {
  let service: FavoriteRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteRoomsService],
    }).compile();

    service = module.get<FavoriteRoomsService>(FavoriteRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
