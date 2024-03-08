import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/sorting.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';



@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }
  @Get()
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles('admin', 'subadmin')

  @ApiQuery({
    name: 'filter',
    description: 'Filter items by specific fields (only "age", "name", and "role" are allowed). Use format: filter=attribute:value',
    required: false,
    type: String,
    enum: ['age', 'name', 'role'],
    example: 'age:30'
  })
  @ApiQuery({ name: 'page', description: 'Page number for pagination', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', description: 'Number of items per page for pagination', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'sort', description: 'Sort items by a specific field (only "name" is allowed)',
    required: false, type: String, enum: ['name'], example: 'name:asc'
  })
  @ApiResponse({
    status: 200,
    description: 'The list of users with pagination information',
    type: [User],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid pagination, sorting, or filtering parameters',
  })
  async getAllUsers(
    @CurrentUser() user: User,
    @PaginationParams() paginationParams?: Pagination,
    @SortingParams(['name']) sortingParams?: Sorting[],
    @FilteringParams(['age', "name", "role"]) filteringParams?: Filtering[],
  ): Promise<User[]> {
    return this.userService.findAll(paginationParams, sortingParams, filteringParams);
  }
  @Post()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This route is not yet defined. Please use the signup route instead.',
    type: () => ({
      error: String,
    }),
  })
  async createUser() {
    return new HttpException(
      {
        error: 'This route is not yet defined. Please use the signup route instead.',
      },
      500
    )
  }



  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the user',
    required: true,
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000', // Example UUID
  })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }


  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
    required: true,
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000', // Example UUID
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'The fields to update for the user',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated user',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    await this.userService.findById(id);
    return this.userService.updateById(id, updateUserDto);
  }



  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to delete',
    required: true,
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000', // Example UUID
  })

  @ApiResponse({
    status: 200,
    description: 'The deleted user',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async deleteUser(@Param('id') id: string): Promise<User> {
    await this.userService.findById(id);
    return this.userService.deleteById(id);
  }


  
  @Patch('upload-photo/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './public/users',
        filename: (req, file, cb) => {
          const avatar = `${req.user['_id']}_${req.user['name']}_${extname(
            file.originalname,
          )}`;
          return cb(null, avatar);
        },
      }),
    }),
  )
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to upload the avatar for',
    required: true,
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000', // Example UUID
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The photo file to upload',
    type: 'object',
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary',
          description: 'The photo file to upload',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The updated user with the new avatar',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })

  uploadAvatar(
    @Param('id') params: string,
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(file.filename, user['_id']);
  }

  @Delete('delete-photo/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth(
    
  )
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to delete the avatar for',
    required: true,
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000', // Example UUID
  })
  @ApiResponse({
    status: 200,
    description: 'The user with the avatar deleted',
    type: User,
  })
  deleteAvatar(@Param('id') params: string, @CurrentUser() user: User) {
    return this.userService.deleteAvatar(user['_id'], user.avatar);
  }
}
