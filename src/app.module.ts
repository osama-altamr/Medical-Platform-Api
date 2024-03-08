import { Module } from '@nestjs/common';
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
import { PaymentModule } from './payment/payment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SocketClientModule } from './socket-client/socket-client.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `config/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    // ServeStaticModule.forRoot(
    //   {
    //     rootPath: join(`${__dirname}`,"..", '../static')
    //   }
    // ),
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
    PaymentModule,
    SocketClientModule,
    ChatMessageModule,
    ConversationModule,
    
  ],
})
export class AppModule { }
