import { IsBoolean, IsDate, IsEnum, IsMongoId, IsOptional } from "class-validator";
import { PaymentMethod } from "../enums/payment-method.enum";
import { MedicalExamination } from "src/medical-examination/schemas/medical-examination.schema";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {

    @ApiProperty({
        description: 'Date of the payment',
        type: Date,
        required: false,
    })
    @IsOptional()
    @IsDate()
    date: Date


    @ApiProperty({
        description: 'Method of the payment',
        enum: PaymentMethod,
        example: PaymentMethod.CASH,
    })
    @IsEnum(PaymentMethod)
    method: PaymentMethod


    @ApiProperty({
        description: 'Medical Examination ID',
        example: '60d5ecb4b4850b3e8c8e8b00',
    })
    @IsMongoId()
    medical_examination: MedicalExamination;
    @ApiProperty({
        description: 'Payment status',
        type: Boolean,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    paid: boolean

}