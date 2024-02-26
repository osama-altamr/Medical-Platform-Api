import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Clinic } from "src/clinic/schemas/clinic.schema";
import { Day } from "src/day/schemas/day.schema";
import { User } from "src/user/schemas/user.schema";



export enum ReservationStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    DELAYED = 'delayed',
}


@Schema({
    timestamps: true
})
export class Reservation extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    patient: User
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Clinic" })
    clinic: Clinic
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Day" })
    day: Day
    @Prop()
    timeSlot: string
    @Prop({ enum: ReservationStatus, default: ReservationStatus.PENDING })
    status: ReservationStatus
    @Prop()
    notes: string
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);