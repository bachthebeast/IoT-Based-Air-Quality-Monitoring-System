import { NextRequest, NextResponse } from 'next/server';
import { sensorData, eventEmitter } from '../../lib/shared';
export const runtime = "nodejs"; //khong chay o edge


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { temperature, humidity, pm1, pm2_5, pm10 } = body;
    const timestamp = Date.now();

    // Update data arrays, keep last 100 points
    if (temperature !== undefined) {
      sensorData.temperature.push({ value: temperature, timestamp });
      if (sensorData.temperature.length > 100) sensorData.temperature.shift();
    }
    if (humidity !== undefined) {
      sensorData.humidity.push({ value: humidity, timestamp });
      if (sensorData.humidity.length > 100) sensorData.humidity.shift();
    }
    if (pm1 !== undefined) {
      sensorData.pm1.push({ value: pm1, timestamp });
      if (sensorData.pm1.length > 100) sensorData.pm1.shift();
    }
    if (pm2_5 !== undefined) {
      sensorData.pm2_5.push({ value: pm2_5, timestamp });
      if (sensorData.pm2_5.length > 100) sensorData.pm2_5.shift();
    }
    if (pm10 !== undefined) {
      sensorData.pm10.push({ value: pm10, timestamp });
      if (sensorData.pm10.length > 100) sensorData.pm10.shift();
    }

    // Emit event for SSE
    eventEmitter.dispatchEvent(new CustomEvent('dataUpdate', { detail: sensorData }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing sensor data:', error);
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export { sensorData, eventEmitter };
