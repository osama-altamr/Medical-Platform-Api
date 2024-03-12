import { IsDate, IsEnum, IsMongoId, IsOptional, IsString } from "class-validator"
import { ComplaintStatus } from "../enums/complaint-status.enum"
import { User } from "src/user/schemas/user.schema"
import { ApiProperty } from "@nestjs/swagger"




export class CreateComplaintDto {

    @ApiProperty({
        description: 'Title of the complaint',
        example: 'Broken Equipment',
    })
    @IsString()
    readonly title: string

    @ApiProperty({
        description: 'Description of the complaint',
        example: 'The X-ray machine is not working properly.',
    })
    @IsString()
    readonly description: string

    @ApiProperty({
        description: 'Status of the complaint',
        enum: ComplaintStatus,
        example: ComplaintStatus.OPEN,
    })
    @IsEnum(ComplaintStatus)
    readonly status: ComplaintStatus

    @ApiProperty({
        description: 'Date when the complaint was resolved',
        type: Date,
        required: false,
    })
    @IsOptional()
    @IsDate()
    readonly resolvedAt: Date
    @ApiProperty({
        description: 'Subadmin ID',
        example: '60d5ecb4b4850b3e8c8e8b00',
    })

    @IsMongoId()
    subadmin: User // sub admin

    @ApiProperty({
        description: 'Patient ID',
        example: '60d5ecb4b4850b3e8c8e8b01',
    })

    @IsMongoId()
    patient: User
}