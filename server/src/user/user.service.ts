import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existUser = await this.userModel.findOne({ email: createUserDto.email });

    if (existUser) {
      throw new BadRequestException('Пользователь с таким email уже существует');
    }

    const user = new this.userModel({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      gender: createUserDto.gender,
    });

    return user.save();
  }

  async getProfile(user: { id: string; email: string }) {
    const currentUser = await this.userModel.findOne({ email: user.email }).select('-password');

    if (!currentUser) {
      throw new BadRequestException('Пользователь не найден');
    }

    return { currentUser };
  }

  async findOne(email: string) {
    return this.userModel.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
