import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Clinic } from "src/clinic/schemas/clinic.schema";
import { Center } from "src/center/schemas/center.schema";
import { DoctorSpecializations } from "../enums/doctor-specializations.enum";
import { ApiProperty } from "@nestjs/swagger";


export class CreateDoctorDto {
   @ApiProperty({
      description: 'The name of the doctor.',
      type: String,
   })

   @IsString()
   readonly name: string;
   @ApiProperty({
      description: 'The specialization of the doctor.',
      enum: DoctorSpecializations,
   })
   @IsEnum(DoctorSpecializations)
   specialization: DoctorSpecializations
   @ApiProperty({
      description: 'The number of years of experience the doctor has.',
      type: Number,
   })
   @IsNumber()
   yearsOfExperience: number;


   @ApiProperty({
      description: 'The contact email of the doctor.',
      type: String,
   })
   @IsEmail()
   contactEmail: string
   @ApiProperty({
      description: 'The contact phone number of the doctor.',
      type: String,
   })
   @IsPhoneNumber()
   contactPhoneNumber: string

   @ApiProperty({
      description: 'The centers where the doctor practices.',
      type: ['string'],
   })
   @IsArray()
   @IsString({ each: true })
   centers: Center[]

   @ApiProperty({
      description: 'Whether the doctor is currently active.',
      type: Boolean,
   })
   @IsBoolean()
   active: boolean
   @ApiProperty({
      description: 'The clinics where the doctor practices.',
      type: ['string'],
      required: false,
   })
   @IsArray()
   @IsOptional()
   @IsString({ each: true })
   clinic?: Clinic[];




}