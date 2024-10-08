import { useMemo, useState } from "react";
import { formatEnergy, formatMoney } from "../utils/string";
import { DeviceCount } from "../models/device";
import { colorMap } from "../data/colorMap";
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
            <Card className="h-max min-w-[850px]">
                <div className="flex">
                    <div className="flex flex-col items-start m-4">
                        {[
                            {
                                name: "Estimated Cost",
                                value: formatMoney(cost),
                            },
                            {
                                name: "Total Energy",
                                value: formatEnergy(totalEnergy),
                            },
                            {
                                name: "Dimensions",
                                value: `${10 * rowCount} ft x ${maxWidth} ft`,
                            },
                        ].map((item) => (
                            <p key={item.name}>
                                <b>{item.name}:</b> {item.value}
                            </p>
                        ))}
                    </div>
                </div>
                <SiteMap
                    deviceCounts={deviceCounts}
                    setRowCount={setRowCount}
                    setMaxWidth={setMaxWidth}
                />
            </Card>
            <Legend {...colorMap} />
        </div>
    );
};

const Legend = (dict: { [key: string]: string }) => {
    return (
        <Card className="mx-4 p-4 h-fit">
            <div className="flex flex-col items-center">
                <p>
                    <b>Keys:</b>
                </p>
                {Object.keys(dict).map((key) => (
                    <div
                        key={key}
                        className={`w-full my-1 mx-2 p-2 ${colorMap[key]}`}
                    >
                        {key}
                    </div>
                ))}
            </div>
        </Card>
    );
};
