import { IsArray, IsBoolean, IsDate, IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateClinicDto {
   @IsString()
    readonly  name: string;
    @IsString()
    readonly  specialization:string;
    @IsPhoneNumber()
    readonly phoneNumber:string
    @IsEmail()
    readonly  email:string
    @IsDate()
    readonly foundedDate: Date;
    @IsArray()
    @IsString({ each: true })
    readonly doctors:object[]
    @IsArray()
    @IsString({ each: true })
    readonly employees:object[]
    @IsBoolean()
    readonly accepted: boolean;   
}