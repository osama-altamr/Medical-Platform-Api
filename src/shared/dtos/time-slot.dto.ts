

import { IsBoolean, IsString, Matches } from 'class-validator';

export class TimeSlotDto {
  @IsString()
  @Matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i)
  hour: string;
  @IsBoolean()
  isAvailable: boolean;
}