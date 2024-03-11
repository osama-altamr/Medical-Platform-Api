import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";


@Schema({})
export class Location extends Document {
    @ApiProperty({ description: 'Type of the location', enum: ['Point'] })
    @Prop({ enum: ['Point'] })
    type: string


    @ApiProperty({ description: 'Coordinates of the location', type: [Number] })
    @Prop({ index: '2dsphere' })
    coordinates: number[]

    @ApiProperty({ description: 'Description of the location' })
    @Prop()
    description: string

    @ApiProperty({ description: 'Address of the location' })
    @Prop()
    address: string
}

