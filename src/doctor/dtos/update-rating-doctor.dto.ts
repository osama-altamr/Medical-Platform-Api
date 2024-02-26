import { PartialType } from "@nestjs/mapped-types";
import { IsNumber } from "class-validator";


class DoctorRatingDto {
    @IsNumber()
    likes: number
    @IsNumber()
    dislikes: number
    @IsNumber()
    ratingsAverage: number
    @IsNumber()
    ratingsQuantity: number
    @IsNumber()
    isRecommended: boolean
}

export class UpdateDoctorRatingsDto extends PartialType(DoctorRatingDto) { } 
