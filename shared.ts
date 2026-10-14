// Shared data and event emitter for SSE
export const sensorData = {
  temperature: [] as { value: number; timestamp: number }[],
  humidity: [] as { value: number; timestamp: number }[],
  pm1: [] as { value: number; timestamp: number }[],
  pm2_5: [] as { value: number; timestamp: number }[],
  pm10: [] as { value: number; timestamp: number }[],
};

export const eventEmitter = new EventTarget();
