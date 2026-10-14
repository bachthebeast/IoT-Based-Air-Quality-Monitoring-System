'use client';

import { useEffect, useState } from 'react';
import LineChart from './components/LineChart';
import WarningPopup from './components/WarningPopup';

interface SensorData {
  temperature: { value: number; timestamp: number }[];
  humidity: { value: number; timestamp: number }[];
  pm1: { value: number; timestamp: number }[];
  pm2_5: { value: number; timestamp: number }[];
  pm10: { value: number; timestamp: number }[];
}

export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: [],
    humidity: [],
    pm1: [],
    pm2_5: [],
    pm10: [],
  });

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event) => {
      try {
        const data: SensorData = JSON.parse(event.data);
        setSensorData(data);
      } catch (err) {
        console.error("JSON parse error:", err);
      }
    };
    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const getLatestValue = (data: { value: number; timestamp: number }[]) => {
    return data.length > 0 ? data[data.length - 1].value : 0;
  };

  const getChartData = (data: { value: number; timestamp: number }[]) => {
    return data.map(item => item.value);
  };

  const getTimeline = (data: { value: number; timestamp: number }[]) => {
    return data.map(item => new Date(item.timestamp).toLocaleTimeString());
  };

  return (
    <div className="min-h-screen bg-blue-200 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Nguyen Bach Dashboard Monitoring</h1>
        <div className="grid grid-cols-1  gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Temperature</h2>
            <div className="h-64">
              <LineChart
                data={getChartData(sensorData.temperature)}
                timeline={getTimeline(sensorData.temperature)}
                config={{
                  title: 'Temperature (°C)',
                  xAxisLabel: 'Time',
                  yAxisLabel: 'Temperature',
                  color: 'rgb(255, 99, 132)',
                }}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Humidity</h2>
            <div className="h-64">
              <LineChart
                data={getChartData(sensorData.humidity)}
                timeline={getTimeline(sensorData.humidity)}
                config={{
                  title: 'Humidity (%)',
                  xAxisLabel: 'Time',
                  yAxisLabel: 'Humidity',
                  color: 'rgb(54, 162, 235)',
                }}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">PM1.0</h2>
            <div className="h-64">
              <LineChart
                data={getChartData(sensorData.pm1)}
                timeline={getTimeline(sensorData.pm1)}
                config={{
                  title: 'PM1.0 (µg/m³)',
                  xAxisLabel: 'Time',
                  yAxisLabel: 'PM1.0',
                  color: 'rgb(255, 205, 86)',
                }}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">PM2.5</h2>
            <div className="h-64">
              <LineChart
                data={getChartData(sensorData.pm2_5)}
                timeline={getTimeline(sensorData.pm2_5)}
                config={{
                  title: 'PM2.5 (µg/m³)',
                  xAxisLabel: 'Time',
                  yAxisLabel: 'PM2.5',
                  color: 'rgb(75, 192, 192)',
                }}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">PM10</h2>
            <div className="h-64">
              <LineChart
                data={getChartData(sensorData.pm10)}
                timeline={getTimeline(sensorData.pm10)}
                config={{
                  title: 'PM10 (µg/m³)',
                  xAxisLabel: 'Time',
                  yAxisLabel: 'PM10',
                  color: 'rgb(153, 102, 255)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <WarningPopup
        temperature={getLatestValue(sensorData.temperature)}
        pm2_5={getLatestValue(sensorData.pm2_5)}
      />
    </div>
  );
}
