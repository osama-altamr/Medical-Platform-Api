import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";
import { ComplaintStatus } from "../enums/complaint-status.enum";
import { User } from "src/user/schemas/user.schema";



@Schema()
export class Complaint extends Document {
    @Prop()
    title: string
    @Prop()
    description: string
    @Prop({ enum: ComplaintStatus })
    status: ComplaintStatus
    @Prop()
    resolvedAt: Date
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    assigneeId: User // sub admin
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    patient: User  // patient
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);