import { Module } from '@nestjs/common';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Complaint, ComplaintSchema } from './schemas/complaint.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Complaint.name,
        schema: ComplaintSchema
      }
    ])
  ],
  controllers: [ComplaintController],
  providers: [ComplaintService]
})
export class ComplaintModule { }
