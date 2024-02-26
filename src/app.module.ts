import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ClinicModule } from './clinic/clinic.module';
import { CenterModule } from './center/center.module';
import { DoctorModule } from './doctor/doctor.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { SharedModule } from './shared/shared.module';
import { DayModule } from './day/day.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReviewModule } from './review/review.module';
import { ComplaintModule } from './complaint/complaint.module';
import { MedicalExaminationModule } from './medical-examination/medical-examination.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `config/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI_LOCAL),
    PassportModule.register({ session: true }),
    UserModule,
    AuthModule,
    ClinicModule,
    CenterModule,
    DoctorModule,
    MedicalRecordModule,
    SharedModule,
    ReservationModule,
    DayModule,
    ReviewModule,
    ComplaintModule,
    MedicalExaminationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
