import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  className?: string;
  options?: any;
}

export function BarChart({ data, className, options }: BarChartProps) {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    ...options,
  };
  
  return <Bar data={data} options={defaultOptions} className={className} />;
}

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor?: string;
      fill?: boolean;
    }[];
  };
  className?: string;
  options?: any;
}

export function LineChart({ data, className, options }: LineChartProps) {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    ...options,
  };
  
  return <Line data={data} options={defaultOptions} className={className} />;
}

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      label?: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  className?: string;
  options?: any;
}

export function PieChart({ data, className, options }: PieChartProps) {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
    ...options,
  };
  
  return <Pie data={data} options={defaultOptions} className={className} />;
}