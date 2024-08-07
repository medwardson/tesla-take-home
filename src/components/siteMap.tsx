import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Device, DeviceCount } from "../models/device";
import { colorMap } from "../utils/colorMap";

interface SiteMapProps {
    deviceCounts: DeviceCount[];
    setRowCount: (rowCount: number) => void;
    setMaxWidth: (maxWidth: number) => void;
}

const MAX_WIDTH = 100;

export const SiteMap = ({
    deviceCounts,
    setRowCount,
    setMaxWidth,
}: SiteMapProps) => {
    const [rows, setRows] = useState<Device[][]>([]);

    useEffect(() => {
        const newRows: Device[][] = [];
        let currentRow: Device[] = [];
        let maxWidth = 0;
        let currentWidth = 0;

        for (let i = 0; i < deviceCounts.length; i++) {
            const deviceCount = deviceCounts[i];

            for (let j = 0; j < deviceCount.count; j++) {
                if (currentWidth + deviceCount.device.widthFt > MAX_WIDTH) {
                    newRows.push(currentRow);
                    currentRow = [];
                    maxWidth = Math.max(maxWidth, currentWidth);
                    currentWidth = 0;
                }

                currentRow.push(deviceCount.device);
                currentWidth += deviceCount.device.widthFt;
            }
        }

        if (currentRow.length > 0) newRows.push(currentRow);
        maxWidth = Math.max(maxWidth, currentWidth);

        setMaxWidth(maxWidth);
        setRowCount(newRows.length);
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
            className={`border m-1 p-2 ${colorMap[device.name] ?? ""}`}
            style={{
                width: device.widthFt * 8,
                height: device.heightFt * 5,
            }}
        ></div>
    );
};
