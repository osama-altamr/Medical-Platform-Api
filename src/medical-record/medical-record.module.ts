import { Module } from '@nestjs/common';
import { MedicalRecordController } from './medical-record.controller';
import { MedicalRecordService } from './medical-record.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalRecord, MedicalRecordSchema } from './schemas/medical-record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MedicalRecord.name,
        schema: MedicalRecordSchema
      }
    ])],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService],
  exports: [MedicalRecordService]
})
export class MedicalRecordModule { }
