import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAll(query: Query): Promise<User[]> {
    let keyword = {};
    if (!query.page) {
      keyword = query;
    }
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    // const keyword = query.keyword
    //   ? {
    //       name: {
    //         $regex: query.keyword,
    //         $options: 'i',
    //       },
    //     }
    //   : {};
    return await this.userModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
  }

  async create(user) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      const userRepo = await this.userModel.create(user);
      return userRepo;
    } catch (err) {
      // Handle Duplicate Email
      if (err.code == 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }

  async findById(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'Wrong mongoose ID Error.Please enter correct ID ',
      );
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateById(id: string, user): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      runValidators: true,
      new: true,
    });
  }
  async deleteById(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
  async uploadAvatar(filename, id: string) {
    const user = await this.userModel.findByIdAndUpdate(id, {
      avatar: filename,
    });
    if (user) {
      return 'Added';
    }
  }
  async deleteAvatar(id: string, avatar: string) {
    const user = await this.userModel.findByIdAndUpdate(id, {
      avatar: null,
    });
    if (user) {
      await fs.unlink(`${__dirname}/../../public/${avatar}`, (err) => {
        if (err) {
          throw new InternalServerErrorException();
        }
      });
    }
  }
}
