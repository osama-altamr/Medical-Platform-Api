import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose,{Document} from "mongoose";

@Schema()
export class Clinic extends Document {
@Prop()
name: string;
@Prop()
specialization:string;
@Prop()
phoneNumber:string
@Prop()
email:string
@Prop({ default: Date.now })
foundedDate: Date;
@Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"}]})
doctors:object[]
@Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]})
employees:object[]
@Prop({ default: false })
accepted: boolean;
}

export const  ClinicSchema = SchemaFactory.createForClass(Clinic);