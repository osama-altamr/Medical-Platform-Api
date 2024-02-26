import { IsArray, IsMongoId, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { Doctor } from "src/doctor/schemas/doctor.schema";
import { MedicalRecord } from "src/medical-record/schemas/medical-record.schema";
import { User } from "src/user/schemas/user.schema";


export class CreateMedicalExaminationDto {
    @IsMongoId()
    patient: User
    @IsMongoId()
    doctor: Doctor
    @IsMongoId()
    medical_record: MedicalRecord
    @IsNumber()
    price: number
    @IsString()
    type: string
    @IsString()
    @IsOptional()
    notes: string
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in the format MM/DD/YYYY',
    })
    followUpDate: string
    @IsArray()
    @IsString({ each: true })
    attachments: Object[]
}