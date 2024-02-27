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

@Controller('medical-examinations')
export class MedicalExaminationController {
    constructor(
        private medicalExaminationService: MedicalExaminationService
    ) { }
    @Get()
    async getMedicalExaminations(): Promise<MedicalExamination[]> {
        return this.medicalExaminationService.findAll();
    }
    @Post()
    async createMedicalExamination(
        @Body() createMedicalExaminationDto: CreateMedicalExaminationDto
    ): Promise<MedicalExamination> {
        return this.medicalExaminationService.create(createMedicalExaminationDto)
    }
    @Get(':id')
    async getMedicalExamination(
        @Param('id') id: string
    ): Promise<MedicalExamination> {
        return this.medicalExaminationService.findById(id);
    }
    @Patch(':id')
    async updateMedicalExamination(
        @Param('id') id: string,
        @Body() updateMedicalExaminationDto: UpdateMedicalExaminationDto
    ): Promise<MedicalExamination> {
        return this.medicalExaminationService.updateById(id, updateMedicalExaminationDto);
    }

    @Delete(':id')
    async deleteMedicalExamination(
        @Param('id') id: string
    ): Promise<{ deleted: boolean }> {
        return this.medicalExaminationService.deleteById(id);
    }

    @Put('upload-attachments/:id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('patient')
    @UseInterceptors(FilesInterceptor('files', 15, {
        storage: diskStorage({
            destination: `./public/attachments`,
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                return cb(null, `${req.user['name']}-${file.originalname.split('.')[0]}${extname(file.originalname)}`)
            }
        })
    }))
    async uploadAttachments(
        @CurrentUser() user: User,
        @UploadedFiles() files: Express.Multer.File[],
        @Param("id") id: string
    ): Promise<MedicalExamination> {
        return this.medicalExaminationService.uploadAttachments(id, files)
    }

}
