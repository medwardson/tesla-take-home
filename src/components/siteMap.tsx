import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Device, DeviceCount } from "../models/device";
import { colorMap } from "../utils/colorMap";
import { constructSiteMap } from "../utils/siteMap";

interface SiteMapProps {
    deviceCounts: DeviceCount[];
    setRowCount: (rowCount: number) => void;
    setMaxWidth: (maxWidth: number) => void;
}

export const SiteMap = ({
    deviceCounts,
    setRowCount,
    setMaxWidth,
}: SiteMapProps) => {
    const [rows, setRows] = useState<Device[][]>([]);

    useEffect(() => {
        const { newRows, rowCount, maxWidth } = constructSiteMap(deviceCounts);

        setMaxWidth(maxWidth);
        setRowCount(rowCount);
        setRows(newRows);
    }, [deviceCounts]);

    return (
        <Card className="m-2 p-4 overflow-scroll h-fit">
            <div className="flex flex-col items-start">
                <h2 className="text-lg font-bold">Site Map</h2>
                <div>
                    {!rows.length && <p>No devices selected</p>}
                    {rows.map((row, i) => {
                        return (
                            <div key={i} className="flex flex-row">
                                {row.map((device, j) => {
                                    return (
                                        <DeviceTile key={j} device={device} />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
};

const DeviceTile = ({ device }: { device: Device }) => {
    return (
        <div
            className={`border-4 border-white p-2 ${
                colorMap[device.name] ?? ""
            }`}
            style={{
                width: device.widthFt * 8,
                height: device.heightFt * 5,
            }}
        ></div>
    );
};
