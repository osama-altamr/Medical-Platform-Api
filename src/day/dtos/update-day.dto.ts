import { PartialType } from "@nestjs/swagger";
import { CreateDayDto } from "./create-day.dto";


export class UpdateDayDto extends PartialType(CreateDayDto) { }