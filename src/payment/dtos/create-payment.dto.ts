import { IsBoolean, IsDate, IsEnum, IsMongoId, IsOptional } from "class-validator";
import { PaymentMethod } from "../enums/payment-method.enum";
import { MedicalExamination } from "src/medical-examination/schemas/medical-examination.schema";

export class CreatePaymentDto {

    @IsOptional()
    @IsDate()
    date: Date
    @IsEnum(PaymentMethod)
    method: PaymentMethod
    @IsMongoId()
    medical_examination: MedicalExamination;
    @IsOptional()
    @IsBoolean()
    paid: boolean

}