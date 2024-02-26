import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Day, DaySchema } from './schemas/day.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Day.name, schema: DaySchema }
    ])
  ],
  providers: [DayService],
  controllers: [DayController],
  exports: [DayService]
})
export class DayModule { }
