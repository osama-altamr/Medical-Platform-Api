import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";
import { MedicalExamination } from "src/medical-examination/schemas/medical-examination.schema";
import { PaymentMethod } from "../enums/payment-method.enum";







@Schema()
export class Payment extends Document {
  @Prop({ type: Date, default: Date.now() })
  date: Date
  @Prop({ enum: PaymentMethod, default: PaymentMethod.CASH })
  method: PaymentMethod
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "MedicalExamination" })
  medical_examination: MedicalExamination;
  @Prop({ type: Boolean, default: false })
  paid: boolean
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
