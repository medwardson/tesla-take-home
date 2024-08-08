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
        <div className="flex m-2">
            <Card className="h-max min-w-[880px]">
                <div className="flex">
                    <div className="flex flex-col items-start m-4">
                        <p>
                            <b>Estimated Cost:</b> {formatMoney(cost)}
                        </p>
                        <p>
                            <b>Total Energy:</b> {formatEnergy(totalEnergy)}
                        </p>
                        {rowCount > 0 && (
                            <p>
                                <b>Dimensions:</b> {10 * rowCount} ft x{" "}
                                {maxWidth} ft
                            </p>
                        )}
                    </div>
                </div>
                <SiteMap
                    deviceCounts={deviceCounts}
                    setRowCount={setRowCount}
                    setMaxWidth={setMaxWidth}
                />
            </Card>
            <Card className="mx-4 h-fit">
                <div className="flex flex-col items-center">
                    <p>Keys:</p>
                    {Object.keys(colorMap).map((key) => (
                        <div key={key} className={`m-2 p-2 ${colorMap[key]}`}>
                            {key}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
