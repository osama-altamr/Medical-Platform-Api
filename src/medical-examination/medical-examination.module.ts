import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalExamination, MedicalExaminationSchema } from './schemas/medical-examination.schema';
import { MedicalExaminationController } from './medical-examination.controller';
import { MedicalExaminationService } from './medical-examination.service';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({

    imports: [
        ReservationModule,
        MongooseModule.forFeature([{
            name: MedicalExamination.name,
            schema: MedicalExaminationSchema
        }])
    ],
    controllers: [MedicalExaminationController],
    providers: [MedicalExaminationService]
})
export class MedicalExaminationModule {
}
