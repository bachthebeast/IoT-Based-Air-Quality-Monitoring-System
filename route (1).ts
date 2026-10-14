import { NextRequest } from "next/server";
import { sensorData, eventEmitter } from "../../lib/shared";
export const runtime = "nodejs"; //khong chay o edge

export async function GET(request: NextRequest) {
  const responseStream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      // Send initial data
      const initialData = JSON.stringify(sensorData);
      controller.enqueue(encoder.encode(`data: ${initialData}\n\n`));

      // Listen for data updates
      const handleUpdate = (event: Event) => {
        const customEvent = event as CustomEvent;
        const updatedData = JSON.stringify(customEvent.detail);
        controller.enqueue(encoder.encode(`data: ${updatedData}\n\n`));
      };

      eventEmitter.addEventListener("dataUpdate", handleUpdate);

      // Cleanup on close
      request.signal.addEventListener("abort", () => {
        eventEmitter.removeEventListener("dataUpdate", handleUpdate);
        controller.close();
      });
    },
  });

  return new Response(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
