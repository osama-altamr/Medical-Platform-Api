import { IsArray, IsBoolean, IsDate, IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateClinicDto {
   @IsString()
    readonly  name: string;
    @IsString()
    readonly  specialization:string;
    @IsPhoneNumber()
    readonly phoneNumber:string
    @IsEmail()
    readonly  email:string
    @IsArray()
    @IsString({ each: true })
    readonly doctors:object[]
    @IsArray()
    @IsString({ each: true })
    readonly employees:object[]
    @IsBoolean()
    @IsOptional()
    readonly accepted: boolean;   
}