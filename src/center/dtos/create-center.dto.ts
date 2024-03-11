import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Max, isNumber, isPhoneNumber } from "class-validator";
import { Location } from "../schemas/location.schema";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCenterDto {
    @ApiProperty({ description: 'Manager ID of the center', type: String, format: 'mongo-id' })
    @IsString()
    readonly manager: string;

    @ApiProperty({ description: 'Name of the center' })
    @IsString()
    readonly name: string;

    
    @ApiProperty({ description: 'Phone number of the center' })
    @IsPhoneNumber()
    readonly phone: string;
    
    @ApiProperty({ description: 'Opening hours of the center', type: 'number', maximum: 24 })
    @IsNumber()
    @Max(24)
    readonly openingHours: number;
    @IsNotEmpty()
    
    @ApiProperty({ description: 'Location of the center', type: Location })
    readonly location: Location

    @ApiProperty({ description: 'List of clinic IDs in the center', type: [String], format: 'mongo-id' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly clinics: object[]

    @IsOptional()
    @IsBoolean()
    readonly accepted: boolean;
}
