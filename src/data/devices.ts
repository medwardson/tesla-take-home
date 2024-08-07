import { Device } from "../models/device";

export const devices: Device[] = [
    {
        name: "Megapack 2XL",
        heightFt: 10,
        widthFt: 40,
        energyMwh: 4,
        cost: 120000,
        releaseDate: new Date("2022-01-01"),
    },
    {
        name: "Megapack 2",
        heightFt: 10,
        widthFt: 30,
        energyMwh: 3,
        cost: 80000,
        releaseDate: new Date("2021-01-01"),
    },
    {
        name: "Megapack",
        heightFt: 10,
        widthFt: 30,
        energyMwh: 2,
        cost: 50000,
        releaseDate: new Date("2005-01-01"),
    },
    {
        name: "Powerpack",
        heightFt: 10,
        widthFt: 10,
        energyMwh: 1,
        cost: 20000,
        releaseDate: new Date("2000-01-01"),
    },
    {
        name: "Transformer",
        heightFt: 10,
        widthFt: 10,
        energyMwh: -0.25,
        cost: 10000,
    },
];
