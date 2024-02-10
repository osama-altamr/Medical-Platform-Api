import { Module } from '@nestjs/common';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Clinic, ClinicSchema } from './schemas/clinic.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Clinic.name, schema: ClinicSchema }])
  ],
  controllers: [ClinicController],
  providers: [ClinicService]
})
export class ClinicModule {}
