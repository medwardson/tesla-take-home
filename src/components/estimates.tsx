import { useMemo, useState } from "react";
import { formatEnergy, formatMoney } from "../utils/string";
import { DeviceCount } from "../models/device";
import { colorMap } from "../utils/colorMap";
import { SiteMap } from "./siteMap";
import { Card } from "@mui/material";

interface EstimatesProps {
    deviceCounts: DeviceCount[];
}

export const Estimates = ({ deviceCounts }: EstimatesProps) => {
    const [rowCount, setRowCount] = useState(0);
    const [maxWidth, setMaxWidth] = useState(0);

    const cost = useMemo(() => {
        return deviceCounts.reduce((acc, dev) => {
            return acc + dev.count * dev.device.cost;
        }, 0);
    }, [deviceCounts]);

    const totalEnergy = useMemo(() => {
        return deviceCounts.reduce((acc, dev) => {
            return acc + dev.count * dev.device.energyMwh;
        }, 0);
    }, [deviceCounts]);

    return (
        <Card className="h-max m-4 min-w-60">
            <div className="flex">
                <div className="flex flex-col items-start m-4">
                    <p>Estimated Cost: {formatMoney(cost)}</p>
                    <p>Total Energy: {formatEnergy(totalEnergy)}</p>
                    {rowCount > 0 && (
                        <p>
                            Dimensions: {10 * rowCount} ft x {maxWidth} ft
                        </p>
                    )}
                </div>
                <div className="flex items-center">
                    <p>Keys:</p>
                    {Object.keys(colorMap).map((key) => (
                        <div key={key} className={`m-2 p-2 ${colorMap[key]}`}>
                            {key}
                        </div>
                    ))}
                </div>
            </div>
            <SiteMap
                deviceCounts={deviceCounts}
                setRowCount={setRowCount}
                setMaxWidth={setMaxWidth}
            />
        </Card>
    );
};
