import { ApiProperty } from "@nestjs/swagger";
import { File } from "buffer";
import { IsArray, IsMongoId, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { Doctor } from "src/doctor/schemas/doctor.schema";
import { MedicalRecord } from "src/medical-record/schemas/medical-record.schema";
import { User } from "src/user/schemas/user.schema";


export class CreateMedicalExaminationDto {

    @ApiProperty({
        description: 'Patient ID',
        example: '60d5ecb4b4850b3e8c8e8b00',
    })
    @IsMongoId()
    patient: User
    @ApiProperty({
        description: 'Doctor ID',
        example: '60d5ecb4b4850b3e8c8e8b01',
    })

    @IsMongoId()
    doctor: Doctor

    @ApiProperty({
        description: 'Medical Record ID',
        example: '60d5ecb4b4850b3e8c8e8b02',
    })
    @IsMongoId()
    medical_record: MedicalRecord


    @ApiProperty({
        description: 'Price of the medical examination',
        example: 100,
    })
    @IsNumber()
    price: number

    @ApiProperty({
        description: 'Type of the medical examination',
        example: 'General Checkup',
    })
    @IsString()
    type: string
    @ApiProperty({
        description: 'Notes about the medical examination',
        example: 'Patient is in good health.',
        required: false,
    })

    @IsString()
    @IsOptional()
    notes: string

    @ApiProperty({
        description: 'Follow-up date in MM/DD/YYYY format',
        example: '2023-04-01',
    })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in the format MM/DD/YYYY',
    })
    followUpDate: string


    @ApiProperty({
        description: 'Attachments related to the medical examination',
        required: false,
    })
    @IsArray()
    @IsString({ each: true })
    attachments: Object[]
}