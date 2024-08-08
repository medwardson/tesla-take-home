import React, { useState } from "react";
import "./App.css";
import { devices } from "./data/devices";
import { DeviceCount } from "./models/device";
import { DeviceList } from "./components/deviceList";
import { Estimates } from "./components/estimates";

const App = () => {
    const [totalDevices, setTotalDevices] = useState(0);
    const [deviceCounts, setDeviceCounts] = useState<DeviceCount[]>(
        devices.map((device, i) => {
            return { id: i, count: 0, device: device };
        })
    );

    const updateCount = (id: number, newCount: number) => {
        const newDeviceCount = totalDevices - deviceCounts[id].count + newCount;
        setTotalDevices(newDeviceCount);

        setDeviceCounts([
            ...deviceCounts.map((dev) => {
                if (dev.id === id) return { ...dev, count: newCount };
                if (dev.device.name === "Transformer")
                    return { ...dev, count: Math.ceil(newDeviceCount / 4) };
                return dev;
            }),
        ]);
    };

    return (
        <div className="App">
            <header className="App-header p-2">
                <h2>Site Layout Estimator</h2>
            </header>
            <div className="flex overflow-scroll m-2">
                <DeviceList
                    devices={devices}
                    deviceCounts={deviceCounts}
                    updateCount={updateCount}
                />
                <Estimates deviceCounts={deviceCounts} />
            </div>
        </div>
    );
};

export default App;
