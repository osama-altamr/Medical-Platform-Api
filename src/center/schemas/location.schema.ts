import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({})
export class Location extends Document {
    @Prop({enum:['Point']})
    type:string
    @Prop({index:'2dsphere'})
    coordinates:number[]
    @Prop()
    description:string    
    @Prop()
    address:string
}

