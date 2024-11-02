import { Schema } from "mongoose";
import { PhoneDto } from "../dto/phone.dto";

export const PhoneSchema = new Schema<PhoneDto>(
    {
        phone_number:{type: String, require: true},
        phone_model: { type: String, required: true },
        brand: { type: String, required: true },
        imei: { type: String, required: true, unique: true },
        status: { type: String, enum: ['Ativo', 'Roubado', 'Desativado'], default: 'Ativo' },
        isStolen: { type: Boolean, default: false },
        point: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
            },
        },
        userId: { type: String, ref: 'User', required: true },
    }, {
    timestamps: true,
}
);
