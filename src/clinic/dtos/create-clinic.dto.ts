import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEmail, IsMongoId, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Center } from "src/center/schemas/center.schema";

export class CreateClinicDto {
    @ApiProperty({ description: 'Name of the clinic' })
    @IsString()
    readonly name: string;
    @ApiProperty({ description: 'Specialization of the clinic' })
    @IsString()
    readonly specialization: string;
    @ApiProperty({ description: 'Phone number of the clinic' })
    @IsPhoneNumber()
    readonly phoneNumber: string

    @ApiProperty({ description: 'Email address of the clinic' })
    @IsEmail()
    readonly email: string


    @ApiProperty({ description: 'List of doctors in the clinic', type: [String] })
    @IsArray()
    @IsString({ each: true })
    readonly doctors: object[]

    @ApiProperty({ description: 'List of employees in the clinic', type: [String] })
    @IsArray()
    @IsString({ each: true })
    readonly employees: object[]

    @ApiProperty({ description: 'Whether the clinic has been accepted', required: false })
    @IsBoolean()
    @IsOptional()
    readonly accepted: boolean;
    @ApiProperty({ description: 'Center ID that the clinic belongs to', type: String })
    @IsMongoId()
    readonly center: Center;
}