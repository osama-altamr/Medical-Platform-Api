import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose,{Document} from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
@Schema()
export class Center  extends Document  {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  manager: User;
  @Prop()
  name: string;
  @Prop()
  phone: string;
  @Prop()
  openingHours: number;
  @Prop()
  address: string
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:"Clinic"}]})
  clinics :object[]
  @Prop({ default: false })
  accepted: boolean;
}

export const CenterSchema = SchemaFactory.createForClass(Center);
