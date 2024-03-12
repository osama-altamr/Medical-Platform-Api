import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@ApiTags("Payments")
@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get('/stripe')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('patient')

    @ApiOperation({ summary: 'Get a Stripe checkout session for payment' })
    @ApiResponse({ status: 200, description: 'The Stripe checkout session has been successfully created.', type: CreatePaymentDto })
    @ApiBody({ type: CreatePaymentDto })
    @ApiBearerAuth()
    async getCheckoutSession(
        @Body() createPaymentDto: CreatePaymentDto,
        @Req() req,
    ) {
        return this.paymentService.paymentByStripe(createPaymentDto, req);
    }

    @Post('/cash')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee')
    @ApiOperation({ summary: 'Process payment by cash' })
    @ApiResponse({ status: 200, description: 'The payment has been successfully processed.', type: CreatePaymentDto })
    @ApiBody({ type: CreatePaymentDto })
    @ApiBearerAuth()
    async paymentByCash(
        @Body() createPaymentDto: CreatePaymentDto,
    ) {
        return this.paymentService.paymentByCash(createPaymentDto);
    }

    @Get()

    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee', 'admin', 'subadmin')
    @ApiOperation({ summary: 'Get all payments' })
    @ApiResponse({ status: 200, description: 'The list of payments has been successfully retrieved.', type: [CreatePaymentDto] })
    @ApiBearerAuth()
    async getPayments(): Promise<Payment[]> {
        return await this.paymentService.findAll();
    }

    @Get(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin')
    @ApiOperation({ summary: 'Get a specific payment by ID' })
    @ApiResponse({ status: 200, description: 'The payment has been successfully retrieved.', type: CreatePaymentDto })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the payment to retrieve.' })
    @ApiBearerAuth()
    async getPayment(@Param() id: string): Promise<Payment> {
        return await this.paymentService.findById(id);
    }


    @Patch(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('employee')
    @ApiOperation({ summary: 'Update a specific payment by ID' })
    @ApiResponse({ status: 200, description: 'The payment has been successfully updated.', type: CreatePaymentDto })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the payment to update.' })
    @ApiBody({ type: UpdatePaymentDto })
    @ApiBearerAuth()
    async updatePayment(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
        return await this.paymentService.updateById(id, updatePaymentDto);
    }

    @Delete(":id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin', 'subadmin')
    @ApiOperation({ summary: 'Delete a specific payment by ID' })
    @ApiResponse({
        status: 200, description: 'The payment has been successfully deleted.', schema: {
            type: 'object',
            properties: {
                deleted: { type: "boolean" }
            }
        }
    })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the payment to delete.' })
    @ApiBearerAuth()
    async deletePayment(@Param("id") id: string): Promise<{ deleted: boolean }> {
        return await this.paymentService.deleteById(id);
    }
}
