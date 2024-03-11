import { PartialType } from "@nestjs/swagger";
import { CreateCenterDto } from "src/center/dtos/create-center.dto";


export class UpdateClinicDto extends PartialType(CreateCenterDto) {

}