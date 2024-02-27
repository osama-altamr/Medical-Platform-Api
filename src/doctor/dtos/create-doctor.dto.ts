import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Clinic } from "src/clinic/schemas/clinic.schema";
import { Center } from "src/center/schemas/center.schema";
import { DoctorSpecializations } from "../enums/doctor-specializations.enum";


export class CreateDoctorDto {
   @IsString()
   readonly name: string;

   @IsEnum(DoctorSpecializations)
   specialization: DoctorSpecializations
   @IsNumber()
   yearsOfExperience: number;
   @IsEmail()
   contactEmail: string
   @IsPhoneNumber()
   contactPhoneNumber: string
   @IsArray()
   @IsString({ each: true })
   centers: Center[]
   @IsBoolean()
   active: boolean
   @IsArray()
   @IsOptional()
   @IsString({ each: true })
   clinic?: Clinic[];




}