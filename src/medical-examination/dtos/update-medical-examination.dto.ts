import { PartialType } from "@nestjs/swagger";
import { CreateMedicalExaminationDto } from "./create-medical-examination.dto";


export class UpdateMedicalExaminationDto extends PartialType(CreateMedicalExaminationDto) { };