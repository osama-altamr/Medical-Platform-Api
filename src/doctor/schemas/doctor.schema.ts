import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Center } from "src/center/schemas/center.schema";
import { Clinic } from "src/clinic/schemas/clinic.schema";
import { DoctorAvailability } from "./doctor-availability.schema";

export enum DoctorSpecializations {
  NONE = 'none',
  CARDIOLOGIST = 'Cardiologist',
  NEUROLOGIST = 'Neurologist',
  ONCOLOGIST = 'Oncologist',
  PEDIATRICIAN = 'Pediatrician',
  PSYCHIATRIST = 'Psychiatrist',
  SURGEON = 'Surgeon',
}
@Schema()
export class Doctor extends Document {
  @Prop()
  name: string;
  @Prop({ enum: DoctorSpecializations, default: DoctorSpecializations.NONE })
  specialization: DoctorSpecializations.NONE
  @Prop()
  yearsOfExperience: number;
  @Prop()
  contactEmail: string
  @Prop({ default: true })
  active: boolean
  @Prop()
  contactPhoneNumber: string
  @Prop({ type: [{ type: DoctorAvailability }] })
  availability: DoctorAvailability[]
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Center" }] })
  centers: Center[]
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clinic" }] })
  clinics: Clinic[];
  @Prop({ default: 0, type: Number })
  likes: number;
  @Prop({ default: 0, type: Number })
  dislikes: number;
  @Prop({ default: 0, type: Number })
  ratingsAverage: number;
  @Prop({ default: 0, type: Number })
  ratingsQuantity: number;
  @Prop({ default: false, type: Boolean })
  isRecommended: boolean;
}
export const DoctorSchema = SchemaFactory.createForClass(Doctor)