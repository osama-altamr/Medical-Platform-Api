import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import exp from "constants";
import mongoose, { Document, mongo } from "mongoose";
import { Doctor } from "src/doctor/schemas/doctor.schema";
import { User } from "src/user/schemas/user.schema";



export enum PatientGender {
    MALE = 'male',
    FEMALE = 'female',
    ENGINEER = "engineer"
}

@Schema()
export class MedicalRecord extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    patient: User
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    employer: User;
    @Prop()
    medicalHistory: string;
    @Prop()
    exerciseRegimen: string;
    @Prop()
    dietaryRestrictions: string[];
    @Prop()
    medicationAllergies: string[];
    @Prop()
    chronicDiseases: string[];
    @Prop()
    bloodGroup: string;
    @Prop()
    hereditaryDiseases: string[];
    @Prop()
    height: number;
    @Prop()
    weight: number;
    @Prop()
    age: number;
    @Prop({ enum: PatientGender })
    gender: PatientGender;
    @Prop()
    maritalStatus: string;
    @Prop()
    contactNumber: string;
    @Prop()
    smokingStatus: boolean;
    @Prop()
    alcoholConsumption: boolean;
}


export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);