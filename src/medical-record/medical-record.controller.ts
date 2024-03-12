import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MedicalRecord } from './schemas/medical-record.schema';
import { MedicalRecordService } from './medical-record.service';
import { UpdateMedicalRecordDto } from './dtos/update-medical-record.dto';
import { CreateMedicalRecordDto } from './dtos/create-medical-record.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@ApiTags('Medical Records')
@Controller('medical-records')
export class MedicalRecordController {
    constructor(
        private readonly medicalService: MedicalRecordService
    ) { }

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Create a new medical record',
    })
    @ApiBody({
        description: 'Medical record creation payload',
        type: CreateMedicalRecordDto,
    })
    @ApiResponse({
        status: 201,
        description: 'The medical record has been successfully created.',
        type: CreateMedicalRecordDto,
    })

    async createMedicalRecord(
        @Body() createMedicalRecordDto: CreateMedicalRecordDto
    ): Promise<MedicalRecord> {
        return await this.medicalService.create(createMedicalRecordDto)
    }

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Retrieve all medical records',
    })
    @ApiResponse({
        status: 200,
        description: 'A list of all medical records.',
        type: [CreateMedicalRecordDto],
    })
    async getAllMedicalRecords(): Promise<MedicalRecord[]> {
        return await this.medicalService.findAll();
    }

    @Get(":id")
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Retrieve a medical record by ID',
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'The ID of the medical record to retrieve.',
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'The medical record with the specified ID.',
        type: CreateMedicalRecordDto,
    })
    async getMedicalRecord(
        @Param("id") id: string
    ): Promise<MedicalRecord> {
        return await this.medicalService.findById(id);
    }


    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'employee')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Update a medical record by ID',
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'The ID of the medical record to update.',
        type: String,
    })
    @ApiBody({
        description: 'Medical record update payload',
        type: UpdateMedicalRecordDto,
    })
    @ApiResponse({
        status: 200,
        description: 'The medical record has been successfully updated.',
        type: CreateMedicalRecordDto,
    })
    async updateMedicalRecord(
        @Param("id") id: string,
        @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
    ): Promise<MedicalRecord> {
        return await this.medicalService.updateById(id, updateMedicalRecordDto);
    }
    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Delete a medical record by ID',
        description: 'This endpoint allows deleting a medical record by its unique ID.',
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'The ID of the medical record to delete.',
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'The medical record has been successfully deleted.',
        schema: {
            type: 'object',
            properties: {
                deleted: { type: 'boolean' }
            }
        }
    })
    async deleteMedicalRecord(
        @Param("id") id: string,
    ): Promise<{ deleted: boolean }> {
        return await this.medicalService.deleteById(id);
    }

}
