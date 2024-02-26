import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Mongoose, mongo } from "mongoose";
import { Doctor } from "src/doctor/schemas/doctor.schema";
import { MedicalRecord } from "src/medical-record/schemas/medical-record.schema";
import { User } from "src/user/schemas/user.schema";



@Schema()
export class MedicalExamination extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    patient: User
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" })
    doctor: Doctor
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "MedicalRecord" })
    medical_record: MedicalRecord
    @Prop()
    price: number;
    @Prop({})
    type: string
    @Prop()
    notes: string
    @Prop()
    followUpDate: string
    @Prop({})
    attachments: Object[]
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Payment" })
    // payment: Payment
}


export const MedicalExaminationSchema = SchemaFactory.createForClass(MedicalExamination)