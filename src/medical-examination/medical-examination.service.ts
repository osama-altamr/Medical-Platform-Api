import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MedicalExamination } from './schemas/medical-examination.schema';
import { Model } from 'mongoose';
import { CreateMedicalExaminationDto } from './dtos/create-medical-examination.dto';
import { ReservationService } from 'src/reservation/reservation.service';
import { UpdateMedicalExaminationDto } from './dtos/update-medical-examination.dto';

@Injectable()
export class MedicalExaminationService {

    constructor(@InjectModel(MedicalExamination.name)
    private medicalExaminationModel: Model<MedicalExamination>,
        private reservationService: ReservationService

    ) { }
    async findById(id: string): Promise<MedicalExamination> {
        return await this.medicalExaminationModel.findById(id)
            .populate('patient', 'name')
            .populate('doctor', 'name');
    }
    async findAll(): Promise<MedicalExamination[]> {
        return await this.medicalExaminationModel.find();
    }
    async create(createMedicalExaminationDto: CreateMedicalExaminationDto): Promise<MedicalExamination> {
        const { patient } = createMedicalExaminationDto;
        const reservation = await this.reservationService.findOne(patient.toString());
        if (!reservation) {
            throw new BadRequestException(" Please make a reservation before creating a medical examination");
        }
        return await this.medicalExaminationModel.create(createMedicalExaminationDto);
    }

    async updateById(id: string, updateMedicalExaminationDto: UpdateMedicalExaminationDto)
        : Promise<MedicalExamination> {
        return await this.medicalExaminationModel.findByIdAndUpdate(id, updateMedicalExaminationDto, { runValidators: true, new: true })
    }
    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res = await this.medicalExaminationModel.findByIdAndDelete(id);
        if (!res) return { deleted: false };
        return { deleted: true };
    }
    async uploadAttachments(id: string, files: Express.Multer.File[]): Promise<MedicalExamination> {
        const medExm = await this.medicalExaminationModel.findById(id);
        files.forEach((file) => {
            medExm.attachments.push(file.path);
        })
        return await medExm.save();
    }
}
