import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DateTime } from "luxon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = React.memo(({ salesData }: { salesData: any[] }) => {
  const labels = salesData.map((data) =>
    DateTime.fromISO(data.date).toLocaleString(DateTime.DATE_SHORT)
  );
  const sales = salesData.map((data) => data.sales);

  const data = {
    labels,
    datasets: [
      {
        label: "Sales Over Time",
        data: sales,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sales Trends",
      },
    },
  };

  return <Line data={data} options={options} />;
});

export default LineChart;
