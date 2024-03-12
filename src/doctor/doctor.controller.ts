import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Doctor } from './schemas/doctor.schema';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dtos/update-doctor.dto';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/sorting.decorator';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags("Doctors")
@Controller('doctors')
export class DoctorController {
  constructor(private doctorService: DoctorService) {
  }
  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'subadmin')
  @ApiOperation({
    summary: 'Retrieve a list of doctors with optional pagination, sorting, and filtering',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sorting field and order (e.g., name:asc, yearsOfExperience:desc)',
    type: String,
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filtering criteria (e.g., name:John)',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'A list of doctors matching the query parameters.',
    type: [CreateDoctorDto],
  })
  @ApiBearerAuth()
  async getDoctors(
    @PaginationParams() paginationParams?: Pagination,
    @SortingParams(['name', 'yearsOfExperience']) sortingParams?: Sorting[],
    @FilteringParams(["name"]) filteringParams?: Filtering[],
  ): Promise<Doctor[]> {
    return this.doctorService.findAll(
      paginationParams, sortingParams, filteringParams
    );
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'subadmin')
  @ApiOperation({
    summary: 'Create a new doctor',
  })
  @ApiBody({
    description: 'Doctor creation payload',
    type: CreateDoctorDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The doctor has been successfully created.',
    type: CreateDoctorDto,
  })
  @ApiBearerAuth()
  async createDoctor(
    @Body() createDoctorDto: CreateDoctorDto
  ): Promise<Doctor> {
    return this.doctorService.create(createDoctorDto)
  }



  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Retrieve a doctor by ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the doctor to retrieve.',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The doctor with the specified ID.',
    type: CreateDoctorDto,
  })
  @ApiBearerAuth()
  async getDoctor(
    @Param('id') id: string
  ): Promise<Doctor> {
    return this.doctorService.findById(id);
  }


  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'subadmin', 'submanager')
  @ApiOperation({
    summary: 'Update a doctor by ID',
    description: 'This endpoint allows updating a doctor by their unique ID with the provided details.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the doctor to update.',
    type: String,
  })
  @ApiBody({
    description: 'Doctor update payload',
    type: UpdateDoctorDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The doctor has been successfully updated.',
    type: Doctor,
  })
  @ApiBearerAuth()
  async updateDoctor(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto
  ): Promise<Doctor> {
    return this.doctorService.updateById(id, updateDoctorDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')

  @ApiOperation({
    summary: 'Delete a doctor by ID',
    description: 'This endpoint allows deleting a doctor by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the doctor to delete.',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The doctor has been successfully deleted.',
    schema: { type: 'object', properties: { deleted: { type: 'boolean' } } },
  })
  @ApiBearerAuth()
  async deleteDoctor(
    @Param('id') id: string
  ): Promise<{ deleted: boolean }> {
    return this.doctorService.deleteById(id);
  }

}
