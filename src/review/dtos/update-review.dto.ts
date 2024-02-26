import { PartialType } from "@nestjs/mapped-types";
import { CreateCenterDto } from "src/center/dtos/create-center.dto";
import { CreateReviewDto } from "./create-review.dto";


export class UpdateReviewDto extends PartialType(CreateReviewDto) { }