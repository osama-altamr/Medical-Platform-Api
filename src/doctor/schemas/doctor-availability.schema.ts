import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

const timeValidator = {
  required: true,
  validate: {
    validator: function (v) {
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
      return timeRegex.test(v);
    },
    message: props => `${props.value} is not a valid time!`
  }
};



@Schema()
export class DoctorAvailability extends Document {
  @Prop(
    {
      required: true,
      validate: {
        validator: function (v) {
          const daysMap = {
            Sun: 'Sunday',
            Mon: 'Monday',
            Tue: 'Tuesday',
            Wed: 'Wednesday',
            Thu: 'Thursday',
            Fri: 'Friday',
            Sat: 'Saturday'
          };
          const normalizedDay = daysMap[v] || v;
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          return days.includes(normalizedDay);
        },
        message: props => `${props.value} is not a valid day!`
      }
    }
  )
  day: string;

  @Prop(timeValidator)
  startTime: string;

  @Prop(timeValidator)
  endTime: string;
}