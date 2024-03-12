import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsMongoId, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"
import { Doctor } from "src/doctor/schemas/doctor.schema"
import { User } from "src/user/schemas/user.schema"


export class CreateReviewDto {

    @ApiProperty({
        description: 'Doctor ID',
        example: '60d5ecb4b4850b3e8c8e8b00',
    })
    @IsMongoId()
    doctor: Doctor


    @ApiProperty({
        description: 'Patient ID',
        example: '60d5ecb4b4850b3e8c8e8b01',
    })
    @IsMongoId()
    patient: User



    @ApiProperty({
        description: 'Rating (1-5)',
        example: 4,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Max(5)
    @Min(1)
    rating: number


    @ApiProperty({
        description: 'Review text',
        example: 'Great service!',
    })
    @IsString()
    review: string


    @ApiProperty({
        description: 'Like (0-1)',
        example: 1,
        required: false,
    })

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    like: number

    @ApiProperty({
        description: 'Dislike (0-1)',
        example: 0,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    dislike: number
}