import { PartialType } from "@nestjs/mapped-types";
import { CreateMedicalExaminationDto } from "./create-medical-examination.dto";


export class UpdateMedicalExaminationDto extends PartialType(CreateMedicalExaminationDto) {};