'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: number[];
  timeline: number[] | string[] | (number | string)[];
  config?: {
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    color?: string;
  };
}

export default function LineChart({ data, timeline, config }: LineChartProps) {
  const chartData = {
    labels: timeline,
    datasets: [
      {
        label: config?.title || 'Line Chart',
        data: data,
        borderColor: config?.color || 'rgb(75, 192, 192)',
        backgroundColor: config?.color || 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!config?.title,
        text: config?.title,
      },
    },
    scales: {
      x: {
        title: {
          display: !!config?.xAxisLabel,
          text: config?.xAxisLabel,
        },
      },
      y: {
        title: {
          display: !!config?.yAxisLabel,
          text: config?.yAxisLabel,
        },
      },
    },
    elements: {
      point: {
        radius: 1,
      },
      line: {
        borderWidth: 1,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
