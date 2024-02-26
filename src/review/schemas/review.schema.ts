import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Doctor } from "src/doctor/schemas/doctor.schema";
import { User } from "src/user/schemas/user.schema";



@Schema()
export class Review extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" })
    doctor: Doctor
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    patient: User
    @Prop({ max: 5, min: 1 })
    rating: number
    @Prop()
    review: string
    @Prop({ type: Number, default: 0, min: 0, max: 1 })
    like: number
    @Prop({ type: Number, default: 0, min: 0, max: 1 })
    dislike: number
}
export const ReviewSchema = SchemaFactory.createForClass(Review)