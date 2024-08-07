export interface Device {
    name: string;
    heightFt: number;
    widthFt: number;
    energyMwh: number;
    cost: number;
    releaseDate?: Date;
}

export interface DeviceCount {
    id: number;
    count: number;
    device: Device;
}
