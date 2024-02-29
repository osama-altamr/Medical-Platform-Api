import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dtos/update-payment.dto';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }
    @Get('/stripe')
    async getCheckoutSession(
        @Body() createPaymentDto: CreatePaymentDto,
        @Req() req,
    ) {
        return this.paymentService.paymentByStripe(createPaymentDto, req);
    }

    @Post('/cash')
    async paymentByCash(
        @Body() createPaymentDto: CreatePaymentDto,
    ) {
        return this.paymentService.paymentByCash(createPaymentDto,);
    }

    @Get()
    async getPayments(): Promise<Payment[]> {
        return await this.paymentService.findAll();
    }

    @Get(":id")
    async getPayment(@Param() id: string): Promise<Payment> {
        return await this.paymentService.findById(id);
    }

    @Patch(":id")
    async updatePayment(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
        return await this.paymentService.updateById(id, updatePaymentDto);
    }

    @Delete(":id")
    async deletePayment(@Param("id") id: string): Promise<{ deleted: boolean }> {
        return await this.paymentService.deleteById(id);
    }
}
