import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
export enum UserRoles {
  USER = 'user',
  GUEST = 'guest',
  PATIENT = 'patient',
  MANAGER = 'manager',
  ADMIN = 'admin',
  SUBADMIN = 'subadmin',
  SUBMANAGER = 'submanager',
  DOCTOR = 'doctor',
}
export enum Specializations {
  NONE = 'none',
  GENREAL = 'general',
}
@Schema({
  timestamps: true,
  minimize:false,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret.password;
    },
  },
})
export class User {
  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ select: false })
  password: string;
  @Prop()
  verifyToken: string;

  @Prop({ select: false, type: Date })
  passwordChangedAt: Date;
  
  @Prop({ default: 'default.jpg' })
  avatar: string;

  @Prop()
  passowrdResetToken: string;

  @Prop({ type: Date })
  passowrdResetExpires: Date;

  @Prop({ default: true, select: false })
  active: boolean;
  @Prop({ default: false, select: false })
  verified: boolean;
  @Prop()
  age: number;

  @Prop()
  bio: string;

  @Prop({ enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Prop({
    required: function () {
      return this.role === UserRoles.DOCTOR;
    },
    enum: Specializations,
    default: Specializations.NONE,
  })
  specialization?: Specializations;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });
