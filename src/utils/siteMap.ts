import { Device, DeviceCount } from "../models/device";

const MAX_WIDTH = 100;

export interface SiteMapConstruction {
    newRows: Device[][];
    rowCount: number;
    maxWidth: number;
}

export const constructSiteMap = (
    deviceCounts: DeviceCount[]
): SiteMapConstruction => {
    const newRows: Device[][] = [];
    let currentRow: Device[] = [];
    let maxWidth = 0;
    let currentWidth = 0;

    const sortedDeviceCounts = [...deviceCounts].sort(
        (a, b) => b.device.widthFt - a.device.widthFt
    );

    let remainingDeviceCounts = sortedDeviceCounts.map((dc) => ({ ...dc }));

    while (remainingDeviceCounts.some((dc) => dc.count > 0)) {
        let spaceFound = false;

        for (let i = 0; i < remainingDeviceCounts.length; i++) {
            const deviceCount = remainingDeviceCounts[i];

            if (
                deviceCount.count > 0 &&
                currentWidth + deviceCount.device.widthFt <= MAX_WIDTH
            ) {
                currentRow.push(deviceCount.device);
                currentWidth += deviceCount.device.widthFt;
                deviceCount.count--;
                spaceFound = true;
                break;
            }
        }

        if (!spaceFound) {
            newRows.push(currentRow);
            currentRow = [];
            maxWidth = Math.max(maxWidth, currentWidth);
            currentWidth = 0;
        }
    }

    if (currentRow.length > 0) {
        newRows.push(currentRow);
        maxWidth = Math.max(maxWidth, currentWidth);
    }

    return {
        newRows: newRows,
        rowCount: newRows.length,
        maxWidth,
    };
};
