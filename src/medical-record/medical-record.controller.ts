import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MedicalRecord } from './schemas/medical-record.schema';
import { MedicalRecordService } from './medical-record.service';
import { UpdateMedicalRecordDto } from './dtos/update-medical-record.dto';
import { CreateMedicalRecordDto } from './dtos/create-medical-record.dto';


@Controller('medical-records')
export class MedicalRecordController{
    constructor(
        private readonly medicalService: MedicalRecordService
    ) {}

    @Post()
    async createMedicalRecord(
        @Body() createMedicalRecordDto: CreateMedicalRecordDto
    ): Promise<MedicalRecord> {
        return await this.medicalService.create(createMedicalRecordDto)
    }

    @Get()
    async getAllMedicalRecords(): Promise<MedicalRecord[]> {
        return await this.medicalService.findAll();
    }

    @Get(":id")
    async getMedicalRecord(
        @Param("id") id: string
    ): Promise<MedicalRecord> {
        return await this.medicalService.findById(id);
    }

    @Patch(":id")
    async updateMedicalRecord(
        @Param("id") id: string,
        @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
    ): Promise<MedicalRecord> {
        return await this.medicalService.updateById(id, updateMedicalRecordDto);
    } 
    @Delete(":id")
    async deleteMedicalRecord(
        @Param("id") id: string,
    ): Promise<{ deleted: boolean }> {
        return await this.medicalService.deleteById(id);
    }

}
