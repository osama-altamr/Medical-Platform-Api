import { PartialType } from "@nestjs/mapped-types";
import { CreateCenterDto } from "src/center/dtos/create-center.dto";


export class UpdateClinicDto extends PartialType(CreateCenterDto) {
    
}