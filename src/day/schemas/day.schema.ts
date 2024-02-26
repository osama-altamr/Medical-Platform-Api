import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";
import { Clinic } from "src/clinic/schemas/clinic.schema";



export type TimeSlot = {
  hour: string;
  isAvailable: boolean;
};

@Schema()
export class Day extends Document {
  @Prop({ required: true })
  date: string
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' })
  clinic: Clinic
  @Prop([{
    type: {
      hour: { type: String },
      isAvailable: { type: Boolean, default: true },
    },
  }])
  timeSlots: TimeSlot[]
  @Prop()
  startTime: string;
  @Prop()
  endTime: string;
  @Prop()
  timezone?: string;
}

export const DaySchema = SchemaFactory.createForClass(Day);