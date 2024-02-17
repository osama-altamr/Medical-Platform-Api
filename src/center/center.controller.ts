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
  constructor(private readonly centerService: CenterService) { }
  @Get()
  async getAllCenters(): Promise<Array<Center>> {
    return await this.centerService.findAll();
  }
  @Get(":id")
  async getCenter(@Param() params): Promise<Center> {
    return await this.centerService.findById(params.id);
  }

  @Patch(":id")
  async updateCenter(
    @Param() params,
    @Body() updateCenterDto: UpdateCenterDto,
  ): Promise<Center> {
    return await this.centerService.updateById(params.id, updateCenterDto);
  }
  @Delete(":id")
  async deleteCenter(
    @Param() params,
  ): Promise<Center> {
    return await this.centerService.deleteById(params.id);
  }

  @Post()
  async createCenter(
    @Body() createCenterDto: CreateCenterDto,
  ): Promise<Center> {
    return await this.centerService.create(createCenterDto);
  }

  @Get("distance/:latlng/unit/:unit")
  async getDistance(
    @Param() params
  ) {
    
    return await this.centerService.getDistance(params.latlng,params.unit);
  }

  @Get("centers-within/:distance/:latlng/unit/:unit")
  async getCentersWithin( 
    @Param() params
  ){
    return await this.centerService.getCentersWithin(params.distance,params.latlng,params.unit);
  }
}


