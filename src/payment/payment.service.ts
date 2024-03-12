import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicalExaminationService } from 'src/medical-examination/medical-examination.service';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Payment } from './schemas/payment.schema';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
@Injectable()
export class PaymentService {
    private stripe: Stripe;
    constructor(
        @InjectModel(Payment.name) readonly paymentModel: Model<Payment>,
        private readonly medicalExaminationService: MedicalExaminationService
    ) {
        console.log(process.env.STRIPE_SECRET_KEY)
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    }

    async paymentByStripe(
        createPaymentDto: CreatePaymentDto,
        req
    ) {
        const medicalExamin = await this.medicalExaminationService.findById(createPaymentDto.medical_examination.toString());
        const sessions = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${req.protocol}://${req.get('host')}/`,
            cancel_url: `${req.protocol}://${req.get('host')}/medical-examination/`,
            customer_email: medicalExamin.patient.email,
            client_reference_id: medicalExamin._id,
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `The Type of Medical Examination: ${medicalExamin.type}`,
                        },

                        unit_amount: medicalExamin.price * 100,

                    },
                    quantity: 1,

                }
            ]
        })

        if (sessions) {
            return await this.paymentModel.create({ ...createPaymentDto, paid: true })
        }
    }

    async paymentByCash(createPaymentDto: CreatePaymentDto) {
        return await this.paymentModel.create(createPaymentDto);
    }

    async updateById(id: string, updatePaymentDto: UpdatePaymentDto) {
        return await this.paymentModel.findByIdAndUpdate(id, updatePaymentDto, { runValidators: true, new: true })
    }
    async deleteById(id: string): Promise<{ deleted: boolean }> {
        const res = await this.paymentModel.findByIdAndDelete(id);
        if (!res) {
            return { deleted: false }
        }
        return { deleted: true };
    }

    async findAll(): Promise<Payment[]> {
        return await this.paymentModel.find();
    }
    async findById(id: string): Promise<Payment> {
        return await this.paymentModel.findById(id)
            .populate('medical_examination', 'price')
            ;
    }
}

