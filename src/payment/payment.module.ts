import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { MedicalExaminationModule } from 'src/medical-examination/medical-examination.module';

@Module({
  imports: [
    MedicalExaminationModule,
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema }
    ])
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule { }
