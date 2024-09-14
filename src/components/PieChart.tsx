import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = React.memo(({ salesData }: { salesData: any[] }) => {
  const regions = [...new Set(salesData.map((data) => data.region))];
  const regionSales = regions.map((region) =>
    salesData
      .filter((data) => data.region === region)
      .reduce((sum, item) => sum + item.sales, 0)
  );

  const data = {
    labels: regions,
    datasets: [
      {
        label: "Sales by Region",
        data: regionSales,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
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
        text: "Sales by Region",
      },
    },
  };

  return <Pie data={data} options={options} />;
});

export default PieChart;
