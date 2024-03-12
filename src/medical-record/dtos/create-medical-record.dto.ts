import { IsArray, IsBoolean, IsEnum, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { User } from "src/user/schemas/user.schema";
import { PatientGender } from "../enums/patient-gender.enum";
import { ApiProperty } from "@nestjs/swagger";


export class CreateMedicalRecordDto {

    @ApiProperty({
        description: 'The patient associated with the medical record.',
        type: String,
    })
    @IsString()
    patient: User

    @ApiProperty({
        description: 'The employer associated with the medical record.',
        type: String,
    })

    @IsString()
    employer: User;

    @ApiProperty({
        description: 'The medical history of the patient.',
        type: String,
    })

    @IsString()
    medicalHistory: string;


    @ApiProperty({
        description: 'The exercise regimen of the patient.',
        type: String,
    })

    @IsString()
    exerciseRegimen: string;

    @ApiProperty({
        description: 'Dietary restrictions of the patient.',
        type: [String],
    })

    @IsArray()
    @IsString({ each: true })
    dietaryRestrictions: string[];


    @ApiProperty({
        description: 'Medication allergies of the patient.',
        type: [String],
    })

    @IsArray()
    @IsString({ each: true })
    medicationAllergies: string[];

    @ApiProperty({
        description: 'Chronic diseases of the patient.',
        type: [String],
    })

    @IsArray()
    @IsString({ each: true })
    chronicDiseases: string[];
    @ApiProperty({
        description: 'Blood group of the patient.',
        type: String,
    })

    @IsString()
    bloodGroup: string;

    @ApiProperty({
        description: 'Hereditary diseases of the patient.',
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    hereditaryDiseases: string[];

    @ApiProperty({
        description: 'Height of the patient.',
        type: Number,
    })

    @IsNumber()
    height: number;

    @ApiProperty({
        description: 'Weight of the patient.',
        type: Number,
    })

    @IsNumber()
    weight: number;

    @ApiProperty({
        description: 'Age of the patient.',
        type: Number,
    })

    @IsNumber()
    age: number;

    @ApiProperty({
        description: 'Gender of the patient.',
        enum: PatientGender,
    })

    @IsEnum(PatientGender)
    gender: PatientGender;


    @ApiProperty({
        description: 'Marital status of the patient.',
        type: String,
    })

    @IsString()
    maritalStatus: string;



    @ApiProperty({
        description: 'Contact number of the patient.',
        type: String,
    })

    @IsPhoneNumber()
    contactNumber: string;


    @ApiProperty({
        description: 'Smoking status of the patient.',
        type: Boolean,
    })

    @IsBoolean()
    smokingStatus: boolean;



    @ApiProperty({
        description: 'Alcohol consumption status of the patient.',
        type: Boolean,
    })

    @IsBoolean()
    alcoholConsumption: boolean;
}