import { IsArray, IsBoolean, IsEnum, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { User } from "src/user/schemas/user.schema";
import { PatientGender } from "../enums/patient-gender.enum";


export class CreateMedicalRecordDto {
    @IsString()
    patient: User
    @IsString()
    employer: User;
    @IsString()
    medicalHistory: string;
    @IsString()
    exerciseRegimen: string;
    @IsArray()
    @IsString({ each: true })
    dietaryRestrictions: string[];
    @IsArray()
    @IsString({ each: true })
    medicationAllergies: string[];
    @IsArray()
    @IsString({ each: true })
    chronicDiseases: string[];
    @IsString()
    bloodGroup: string;
    @IsArray()
    @IsString({ each: true })
    hereditaryDiseases: string[];
    @IsNumber()
    height: number;
    @IsNumber()
    weight: number;
    @IsNumber()
    age: number;
    @IsEnum(PatientGender)
    gender: PatientGender;
    @IsString()
    maritalStatus: string;

    @IsPhoneNumber()
    contactNumber: string;

    @IsBoolean()
    smokingStatus: boolean;

    @IsBoolean()
    alcoholConsumption: boolean;
}