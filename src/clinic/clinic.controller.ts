import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Clinic } from './schemas/clinic.schema';
import { UpdateClinicDto } from './dtos/update-clinic.dto';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dtos/create-clinic.dto';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/sorting.decorator';
import { Filtering, FilteringParams } from 'src/shared/decorators/filtering.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
@ApiTags('Clinics')
@Controller('clinics')
export class ClinicController {
    constructor(
        private clinicService: ClinicService
    ) {
    }
    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('manager', 'admin')
    @ApiOperation({ summary: 'Create a new clinic' })
    @ApiBearerAuth()
    @ApiBody({
        type: CreateClinicDto,
        description: 'Payload to create a new clinic',
    })
    @ApiResponse({
        status: 201,
        description: 'The clinic has been successfully created.',
        type: CreateClinicDto,
    })
    async createClinic(
        @Body() createClinicDto: CreateClinicDto
    ): Promise<Clinic> {
        return this.clinicService.create(createClinicDto)
    }


    @Get()

    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get all clinics' })
    @ApiBearerAuth()
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page for pagination' })
    @ApiQuery({ name: 'sort', required: false, description: 'Sorting field and order, only "name" is supported', type: String })
    @ApiQuery({ name: 'filter', required: false, description: 'Filtering field and value, only "name" is supported', type: String })
    @ApiResponse({
        status: 200,
        description: 'The list of clinics has been successfully retrieved.',
        type: [Clinic],
    })
    async getClinics(
        @PaginationParams() paginationParams?: Pagination,
        @SortingParams(['name']) sortingParams?: Sorting[],
        @FilteringParams(["name"]) filteringParams?: Filtering[],
    ): Promise<Clinic[]> {
        return this.clinicService.findAll(
            paginationParams, sortingParams, filteringParams
        );
    }

    @Get(":id")
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a clinic by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID of the clinic to retrieve',
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'The clinic has been successfully retrieved.',
        type: Clinic,
    })
    async getClinic(
        @Param("id") id: string,
    ): Promise<Clinic> {
        return this.clinicService.findById(id);
    }

    @Put(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('manager', 'submanager')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a clinic by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID of the clinic to update',
        type: String,
    })
    @ApiBody({
        type: UpdateClinicDto,
        description: 'Payload to update the clinic',
    })
    @ApiResponse({
        status: 200,
        description: 'The clinic has been successfully updated.',
        type: Clinic, // Use the Clinic class here
    })
    async updateClinic(
        @Param("id") id: string,
        @Body() updateClinicDto: UpdateClinicDto
    ): Promise<Clinic> {
        return this.clinicService.updateById(id, updateClinicDto);
    }


    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('manager')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a clinic by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID of the clinic to delete',
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'The clinic has been successfully deleted.',
        schema: {
            type: 'object',
            properties: {
                deleted: { type: 'boolean', description: 'Indicates whether the clinic was successfully deleted' },
            },
        },
    })
    async deleteClinic(
        @Param("id") id: string
    ): Promise<{ deleted: boolean }> {
        return this.clinicService.deleteById(id)
    }
}
