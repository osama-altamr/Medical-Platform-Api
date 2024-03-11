import { PartialType } from "@nestjs/swagger";
import { CreateCenterDto } from "./create-center.dto";

export class UpdateCenterDto extends PartialType(CreateCenterDto) { }