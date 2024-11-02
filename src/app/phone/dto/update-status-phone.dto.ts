
class PointDto {
    type: 'Point';

    coordinates: [number, number];
}

export class UpdatePhoneStatusDto {
    status?: 'Ativo' | 'Roubado' | 'Desativado';

    isStolen?: boolean;

    point?: PointDto;
}
