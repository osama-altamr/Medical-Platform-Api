import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { MedicalExaminationService } from './medical-examination.service';
import { MedicalExamination } from './schemas/medical-examination.schema';

import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from 'src/user/schemas/user.schema';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateMedicalExaminationDto } from './dtos/update-medical-examination.dto';
import { CreateMedicalExaminationDto } from './dtos/create-medical-examination.dto';
import { extname } from 'path';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Medical Examinations')
@Controller('medical-examinations')
export class MedicalExaminationController {
    constructor(
        private medicalExaminationService: MedicalExaminationService
    ) { }


    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee', 'admin')
    @ApiOperation({ summary: 'Get all medical examinations' })
    @ApiResponse({ status: 200, description: 'The list of medical examinations has been successfully retrieved.', type: [MedicalExamination] })
    @ApiBearerAuth()
    async getMedicalExaminations(): Promise<MedicalExamination[]> {
        return this.medicalExaminationService.findAll();
    }


    @Post()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee')
    @ApiOperation({ summary: 'Create a new medical examination' })
    @ApiResponse({ status: 201, description: 'The medical examination has been successfully created.', type: MedicalExamination })
    @ApiBody({ type: CreateMedicalExaminationDto })
    @ApiBearerAuth()
    async createMedicalExamination(
        @Body() createMedicalExaminationDto: CreateMedicalExaminationDto
    ): Promise<MedicalExamination> {
        return this.medicalExaminationService.create(createMedicalExaminationDto)
    }

    @Get(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee', 'admin')
    @ApiOperation({ summary: 'Get a specific medical examination by ID' })
    @ApiResponse({ status: 200, description: 'The medical examination has been successfully retrieved.', type: CreateMedicalExaminationDto })
    @ApiParam({ name: 'id', description: 'ID of the medical examination to retrieve', required: true })
    @ApiBearerAuth()
    async getMedicalExamination(
        @Param('id') id: string
    ): Promise<MedicalExamination> {
        return this.medicalExaminationService.findById(id);
    }


    @Patch(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee')
    @ApiOperation({ summary: 'Update a specific medical examination by ID' })
    @ApiResponse({ status: 200, description: 'The medical examination has been successfully updated.', type: CreateMedicalExaminationDto })
    @ApiParam({ name: 'id', description: 'ID of the medical examination to update', required: true })
    @ApiBody({ type: UpdateMedicalExaminationDto })
    @ApiBearerAuth()
    async updateMedicalExamination(
        @Param('id') id: string,
        @Body() updateMedicalExaminationDto: UpdateMedicalExaminationDto
    ): Promise<MedicalExamination> {
        return this.medicalExaminationService.updateById(id, updateMedicalExaminationDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('subadmin', 'admin')
    @ApiOperation({ summary: 'Delete a specific medical examination by ID' })
    @ApiResponse({
        status: 200, description: 'The medical examination has been successfully deleted.', schema: {
            type: "object", properties: {
                deleted: { type: "boolean" }
            }
        }
    })
    @ApiParam({ name: 'id', description: 'ID of the medical examination to delete', required: true })
    @ApiBearerAuth()
    async deleteMedicalExamination(
        @Param('id') id: string
    ): Promise<{ deleted: boolean }> {
        return this.medicalExaminationService.deleteById(id);
    }

    @Put('upload-attachments/:id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee')
    @UseInterceptors(FilesInterceptor('files', 15, {
        storage: diskStorage({
            destination: `./public/attachments`,
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                return cb(null, `${req.user['name']}-${file.originalname.split('.')[0]}${extname(file.originalname)}`)
            }
        })
    }))

    @ApiOperation({ summary: 'Upload attachments for a specific medical examination by ID' })
    @ApiResponse({ status: 200, description: 'The attachments have been successfully uploaded.', type: CreateMedicalExaminationDto })
    @ApiParam({ name: 'id', description: 'ID of the medical examination to upload attachments to', required: true })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @ApiBearerAuth()
    async uploadAttachments(
        @CurrentUser() user: User,
        @UploadedFiles() files: Express.Multer.File[],
        @Param("id") id: string
    ): Promise<MedicalExamination> {
        return this.medicalExaminationService.uploadAttachments(id, files)
    }

}
