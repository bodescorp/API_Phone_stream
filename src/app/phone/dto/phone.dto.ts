import { Document, Schema } from "mongoose";

export class PhoneDto extends Document{
    id?: string;
    phone_number: string
    phone_model: string;        // Modelo do telefone
    brand: string;        // Marca do telefone
    imei: string;         // Número IMEI do telefone
    status?:  'Ativo' | 'Roubado' | 'Desativado';      // Status do telefone (e.g., 'Ativo', 'Roubado', 'Desativado')
    isStolen?: boolean;    // Indica se o telefone foi reportado como roubado
    point?: {
        type: 'Point';
        coordinates: [number, number];
    };
    userId: string;
}