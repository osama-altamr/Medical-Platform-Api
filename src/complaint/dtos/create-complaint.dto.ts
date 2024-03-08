import { IsDate, IsEnum, IsMongoId, IsOptional, IsString } from "class-validator"
import { ComplaintStatus } from "../enums/complaint-status.enum"
import { User } from "src/user/schemas/user.schema"




export class CreateComplaintDto {
    @IsString()
    readonly title: string
    @IsString()
    readonly description: string
    @IsEnum(ComplaintStatus)
    readonly status: ComplaintStatus
    @IsOptional()
    @IsDate()
    readonly resolvedAt: Date
    @IsMongoId()
    assigneeId: User // sub admin
    @IsMongoId()
    patient:User
}