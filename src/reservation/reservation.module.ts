import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { MedicalRecordService } from 'src/medical-record/medical-record.service';
import { MedicalRecordModule } from 'src/medical-record/medical-record.module';
import { DayModule } from 'src/day/day.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reservation.name,
        schema: ReservationSchema
      },
    ]),
    MedicalRecordModule,
    DayModule

  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService]

})
export class ReservationModule { }
