import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MedicalRecord } from './schemas/medical-record.schema';
import { Model } from 'mongoose';
import { CreateMedicalRecordDto } from './dtos/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dtos/update-medical-record.dto';

@Injectable()
export class MedicalRecordService {
    constructor(
        @InjectModel(MedicalRecord.name) private medicalRecordModel: Model<MedicalRecord>
    ) { }
    async findAll(): Promise<MedicalRecord[]> {
        return await this.medicalRecordModel.find();
    }

    async findById(id: string): Promise<MedicalRecord> {
        return await this.medicalRecordModel.findById(id);
    }

    async create(createMedicalRecordDto: CreateMedicalRecordDto) {
        return await this.medicalRecordModel.create(createMedicalRecordDto);
    }

    async updateById(id: string, updateMedicalRecordDto: UpdateMedicalRecordDto) {
        return await this.medicalRecordModel.findByIdAndUpdate(id, updateMedicalRecordDto, {
            runValidators: true,
            new: true,
        });
    }
    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res =  await this.medicalRecordModel.findByIdAndDelete(id);
        if(!res) return {deleted : false};
        return { deleted:true } ;
    }


}
