import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Center } from './schemas/center.schema';
import { CenterService } from './center.service';
import { UpdateCenterDto } from './dtos/update-center.dto';
import { CreateCenterDto } from './dtos/create-center.dto';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/sorting.decorator';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@ApiTags('Centers')
@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) { }
  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('manager', 'patient', 'user')

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all centers' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page for pagination' })
  @ApiQuery({ name: 'sort', required: false, description: 'Sorting field and order, only "name" is supported', type: String })
  @ApiQuery({ name: 'filter', required: false, description: 'Filtering field and value, only "name" is supported', type: String })
  @ApiResponse({
    status: 200,
    description: 'The list of centers has been successfully retrieved.',
    type: [CreateCenterDto],
  })
  async getAllCenters(
    @PaginationParams() paginationParams?: Pagination,
    @SortingParams(['name']) sortingParams?: Sorting[],
    @FilteringParams(["name"]) filteringParams?: Filtering[],
  ): Promise<Array<Center>> {
    return await this.centerService.findAll(
      paginationParams, sortingParams, filteringParams
    );
  }

  @Get(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'patient')
  @ApiOperation({ summary: 'Get a center by ID' })
  @ApiBearerAuth()

  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the center to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The center has been successfully retrieved.',
    type: CreateCenterDto, // Use the Center class here
  })
  async getCenter(@Param() params): Promise<Center> {
    return await this.centerService.findById(params.id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a center by ID ',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the center to update',
    type: String,
  })
  @ApiBody({
    type: UpdateCenterDto,
    description: 'Payload to update the center',
  })
  @ApiResponse({
    status: 200,
    description: 'The center has been successfully updated.',
    type: Center, // Use the Center class here
  })
  async updateCenter(
    @Param() params,
    @Body() updateCenterDto: UpdateCenterDto,
  ): Promise<Center> {
    return await this.centerService.updateById(params.id, updateCenterDto);
  }


  @Delete(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a center by ID ',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the center to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The center has been successfully deleted.',
    type: Center, // Use the Center class here
  })

  async deleteCenter(
    @Param() params,
  ): Promise<Center> {
    return await this.centerService.deleteById(params.id);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiBody({
    description: 'Center creation payload',
    type: CreateCenterDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The center has been successfully created.',
    type: CreateCenterDto,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new center',
  })
  async createCenter(
    @Body() createCenterDto: CreateCenterDto,
  ): Promise<Center> {
    return await this.centerService.create(createCenterDto);
  }

  @Get("distance/:latlng/unit/:unit")
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Calculate distance',
    description: 'Calculate the distance based on latitude and longitude with a specified unit.',
  })

  @ApiParam({
    name: 'latlng',
    required: true,
    description: 'Latitude and longitude separated by a comma, e.g., 40.7128,-74.0060',
    type: String,
  })
  @ApiParam({
    name: 'unit',
    required: true,
    description: 'Unit of measurement (e.g., km, mi)',
    type: String,
    enum: ['km', 'mi'], // Assuming the units are kilometers and miles
  })

  @ApiResponse({
    status: 200,
    description: 'The calculated distance.',
    type: Number,
  })
  async getDistance(
    @Param() params
  ) {
    return await this.centerService.getDistance(params.latlng, params.unit);
  }

  @Get("centers-within/:distance/:latlng/unit/:unit")
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Retrieves centers within a specified distance" })
  @ApiParam({
    name: 'distance',
    required: true,
    description: 'The distance within which to search for centers.',
    type: Number,
  })
  @ApiParam({
    name: 'latlng',
    required: true,
    description: 'Latitude and longitude separated by a comma, e.g., 40.7128,-74.0060',
    type: String,
  })
  @ApiParam({
    name: 'unit',
    required: true,
    description: 'Unit of measurement (e.g., km, mi)',
    type: String,
    enum: ['km', 'mi'],
  })
  @ApiResponse({
    status: 200,
    description: 'A list of centers within the specified distance.',
    type: [CreateCenterDto],
  })

  async getCentersWithin(
    @Param() params
  ) {
    return await this.centerService.getCentersWithin(params.distance, params.latlng, params.unit);
  }
}


