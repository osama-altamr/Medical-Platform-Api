import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Max, isNumber, isPhoneNumber } from "class-validator";
import { Location } from "../schemas/location.schema";

export class CreateCenterDto {
    @IsString()
    readonly manager: string;
    @IsString()
    readonly name: string;
    @IsPhoneNumber()
    readonly phone: string;
    @IsNumber()
    @Max(24)
    readonly openingHours: number;
    @IsNotEmpty()
    readonly location: Location
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly clinics: object[]
    @IsOptional()
    @IsBoolean()
    readonly accepted: boolean;
}
