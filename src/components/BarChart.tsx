import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ salesData }: { salesData: any[] }) => {
  const categories = [...new Set(salesData.map((data) => data.category))];
  const categorySales = categories.map((category) =>
    salesData
      .filter((data) => data.category === category)
      .reduce((sum, item) => sum + item.sales, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Sales by Category",
        data: categorySales,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
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
        text: "Sales by Product Category",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
