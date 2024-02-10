import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { DoctorSpecializations } from "../schemas/doctor.schema";
import { Clinic } from "src/clinic/schemas/clinic.schema";


export class CreateDoctorDto{
   @IsString()
readonly    name:string ;
   
  @IsEnum(DoctorSpecializations)
     specialization:DoctorSpecializations
    @IsNumber()
    yearsOfExperience:number;
    @IsEmail()
    contactEmail:string
    @IsPhoneNumber()
    contactPhoneNumber:string
    @IsArray()
    @IsString({ each: true })
    centers :object []
    @IsString()
    @IsNotEmpty()
    clinic :Clinic; 
  
}