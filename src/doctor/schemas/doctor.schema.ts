import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose,{Document} from "mongoose";
import { Center } from "src/center/schemas/center.schema";
import { Clinic } from "src/clinic/schemas/clinic.schema";

export enum DoctorSpecializations {
  NONE = 'none',  
  ANTHROPOLOGIST = 'Anthropologist',
  ANESTHESIOLOGIST = 'Anesthesiologist',
  CARDIOLOGIST = 'Cardiologist',
  DERMATOLOGIST = 'Dermatologist',
  DIAGNOSTIC_RADIOLOGIST = 'Diagnostic Radiologist',
  EMERGENCY_MEDICINE_SPECIALIST = 'Emergency Medicine Specialist',
  GASTROENTEROLOGIST = 'Gastroenterologist',
  HEMATOLOGIST = 'Hematologist',
  INFECTIOUS_DISEASE_SPECIALIST = 'Infectious Disease Specialist',
  INTERNIST = 'Internist',
  NEPHROLOGIST = 'Nephrologist',
  NEUROLOGIST = 'Neurologist',
  OBSTETRICIAN_GYNECOLOGIST = 'Obstetrician/Gynecologist',
  OPHTHALMOLOGIST = 'Ophthalmologist',
  OTOLARYNGOLOGIST = 'Otolaryngologist',
  PATHOLOGIST = 'Pathologist',
  PEDIATRICIAN = 'Pediatrician',
  PHYSICAL_THERAPIST = 'Physical Therapist',
  PLAS_SURGEON = 'Plastic Surgeon',
  PSYCHIATRIST = 'Psychiatrist',
  PULMONOLOGIST = 'Pulmonologist',
  RADIATION_ONCOLOGIST = 'Radiation Oncologist',
  RHEUMATOLOGIST = 'Rheumatologist',
  SPORTS_MEDICINE_SPECIALIST = 'Sports Medicine Specialist',
  UROLOGIST = 'Urologist',
}
const objectId = mongoose.Schema.Types.ObjectId; 
@Schema()
export class Doctor extends Document {
@Prop()
name:string ;
@Prop({ enum: DoctorSpecializations, default: DoctorSpecializations.NONE })
specialization:DoctorSpecializations.NONE
@Prop()
yearsOfExperience:number;
@Prop()
contactEmail:string
@Prop()
contactPhoneNumber:string
@Prop({type:[{type:objectId,ref:"Center"}]})
centers :object []
@Prop({type:objectId,ref:"Clinic"})
clinic :Clinic;
}
export const DoctorSchema = SchemaFactory.createForClass(Doctor)