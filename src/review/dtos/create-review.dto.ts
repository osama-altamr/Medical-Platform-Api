import { IsBoolean, IsMongoId, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"
import { Doctor } from "src/doctor/schemas/doctor.schema"
import { User } from "src/user/schemas/user.schema"


export class CreateReviewDto {
    @IsMongoId()
    doctor: Doctor
    @IsMongoId()
    patient: User
    @IsOptional()
    @IsNumber()
    @Max(5)
    @Min(1)
    rating: number
    @IsString()
    review: string
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    like: number
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    dislike: number
}