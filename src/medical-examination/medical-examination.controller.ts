import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MedicalExaminationService } from './medical-examination.service';
import { MedicalExamination } from './schemas/medical-examination.schema';
import { UpdateMedicalExaminationDto } from './dtos/update-medical-examination.dto';
import { CreateMedicalExaminationDto } from './dtos/create-medical-examination.dto';

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
    @Put(':id')
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


    @Patch(':id')
    async uploadAttachments(): Promise<MedicalExamination> {
        return this.medicalExaminationService.uploadAttachments()
    }

}
