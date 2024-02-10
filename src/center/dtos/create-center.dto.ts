import { ArrayMinSize, IsArray, IsBoolean, IsNumber, IsPhoneNumber, IsString, Max, isNumber, isPhoneNumber } from "class-validator";

export class CreateCenterDto {
    @IsString()
   readonly manager: string;
   @IsString()
   readonly  name: string;
   @IsPhoneNumber()
   readonly phone: string;
   @IsNumber()
   @Max(24)
   readonly openingHours: number;
   @IsString()
   readonly address: string
    @IsArray()
    @IsString({ each: true })
    readonly clinics :object[]
    @IsBoolean()
    readonly  accepted: boolean;
}
