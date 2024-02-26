import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Day } from "src/day/schemas/day.schema";
import { Doctor } from "src/doctor/schemas/doctor.schema";
import { User } from "src/user/schemas/user.schema";

@Schema()
export class Clinic extends Document {
    @Prop()
    name: string;
    @Prop()
    specialization: string;
    @Prop()
    phoneNumber: string
    @Prop()
    isAvailable: Boolean
    @Prop()
    email: string
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }] })
    doctors: Doctor[]
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    employees: User[]
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Day" }] })
    days: Day[]
    @Prop({ default: false })
    accepted: boolean;
    
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);