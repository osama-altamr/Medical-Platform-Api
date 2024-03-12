

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Matches } from 'class-validator';

export class TimeSlotDto {
  @ApiProperty({ description: 'The hour in 12-hour format (e.g., 01:00 PM)', type: String })
  @IsString()
  @Matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/i)
  hour: string;
  @ApiProperty({ description: 'Indicates if the time slot is available', type: Boolean })
  @IsBoolean()
  isAvailable: boolean;
}