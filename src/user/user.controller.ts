import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles('user')
  async getAllUsers(
    @CurrentUser() user: User,
    @Query() query: ExpressQuery,
  ): Promise<User[]> {
    console.log('Query', query);
    return this.userService.findAll(query);
  }
  @Post()
  async createUser() {
    throw new HttpException(
      'This route is not yet defined /Please use signup instead',
      500,
    );
  }
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    await this.userService.findById(id);
    return this.userService.updateById(id, updateUserDto);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    await this.userService.findById(id);
    return this.userService.deleteById(id);
  }
  @Patch('upload-photo/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const avatar = `${req.user['_id']}_${req.user['name']}_${extname(
            file.originalname,
          )}`;
          return cb(null, avatar);
        },
      }),
    }),
  )
  uploadAvatar(
    @Param('id') params: string,
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(file.filename, user['_id']);
  }

  @Delete('delete-photo/:id')
  @UseGuards(JwtGuard)
  deleteAvatar(@Param('id') params: string, @CurrentUser() user: User) {
    return this.userService.deleteAvatar(user['_id'], user.avatar);
  }
}
