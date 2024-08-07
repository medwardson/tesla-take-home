import { Device, DeviceCount } from "../models/device";
import { DeviceSelector } from "./deviceSelector";

interface DeviceListProps {
    devices: Device[];
    deviceCounts: DeviceCount[];
    updateCount: (id: number, newCount: number) => void;
}

export const DeviceList = ({
    devices,
    deviceCounts,
    updateCount,
}: DeviceListProps) => {
    return (
        <div className="overflow-scroll w-3/12">
            <ul>
                {devices.map((device, i) => {
                    return (
                        <li key={device.name}>
                            <DeviceSelector
                                device={device}
                                count={deviceCounts[i].count}
                                onCountChange={(count: number) =>
                                    updateCount(i, count)
                                }
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
