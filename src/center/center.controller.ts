import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Center } from './schemas/center.schema';
import { CenterService } from './center.service';
import { UpdateCenterDto } from './dtos/update-center.dto';
import { CreateCenterDto } from './dtos/create-center.dto';

@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}
  @Get()
  async getAllCenters(): Promise<Array<Center>> {
    return await this.centerService.findAll();
  }
  @Get()
  async getCenter(@Param() params): Promise<Center> {
    return await this.centerService.findOne(params.id);
  }

  @Patch()
  async updateCenter(
    @Param() params,
    updateCenterDto: UpdateCenterDto,
  ): Promise<Center> {
    return await this.centerService.updateCenter(params.id, updateCenterDto);
  }
  @Delete()
  async deleteCenter(
    @Param() params,
    updateCenterDto: UpdateCenterDto,
  ): Promise<Center> {
    return await this.centerService.updateCenter(params.id, updateCenterDto);
  }

  @Post()
  async createCenter(
    @Body() createCenterDto: CreateCenterDto,
  ): Promise<Center> {
    return this.centerService.createCenter(createCenterDto);
  }
}
