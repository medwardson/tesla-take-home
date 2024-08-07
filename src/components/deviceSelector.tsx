import React from "react";
import Card from "@mui/material/Card";
import { Device } from "../models/device";
import { formatEnergy, formatMoney } from "../utils/string";

interface DeviceSelectorProps {
    device: Device;
    count: number;
    onCountChange: (count: number) => void;
}

export const DeviceSelector = ({
    device,
    count,
    onCountChange,
}: DeviceSelectorProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        const newCount = isNaN(value) || value < 0 ? 0 : value;
        onCountChange(newCount);
    };

    return (
        <Card className="m-2 p-4">
            <div className="flex flex-col items-start">
                <h2 className="text-lg font-bold">{device.name}</h2>
                <div className="flex flex-col items-start text-sm">
                    <p>
                        Dimensions: {device.heightFt} ft x {device.widthFt} ft
                    </p>
                    <p>Energy: {formatEnergy(device.energyMwh)}</p>
                    <p>
                        Cost:&nbsp;
                        {formatMoney(device.cost)}
                    </p>
                </div>
                <input
                    type="number"
                    value={count}
                    onChange={handleChange}
                    className="w-1/2 p-1 border"
                    disabled={device.name === "Transformer"}
                />
            </div>
        </Card>
    );
};
