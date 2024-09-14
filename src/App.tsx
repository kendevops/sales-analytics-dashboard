import React, { useState, useEffect, useMemo } from "react";
import { DateTime } from "luxon";
import "./App.css";

const LineChart = React.lazy(() => import("./components/LineChart"));
const BarChart = React.lazy(() => import("./components/BarChart"));
const PieChart = React.lazy(() => import("./components/PieChart"));

interface SalesDataProps {
  date: string;
  category: string;
  region: string;
  sales: number;
}

const App = () => {
  const [salesData, setSalesData] = useState<SalesDataProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: DateTime.now().minus({ months: 1 }).toISODate(),
    endDate: DateTime.now().toISODate(),
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/salesData.json")
      .then((response) => response.json())
      .then((data: SalesDataProps[]) => {
        setSalesData(data);

        const uniqueCategories = Array.from(
          new Set(data.map((item: any) => item.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  const filteredSalesData = useMemo(() => {
    return salesData.filter((data) => {
      const date = DateTime.fromISO(data.date);
      const isWithinDateRange =
        date >= DateTime.fromISO(selectedDateRange.startDate) &&
        date <= DateTime.fromISO(selectedDateRange.endDate);
      const isCategoryMatch =
        selectedCategory === "All" || data.category === selectedCategory;
      return isWithinDateRange && isCategoryMatch;
    });
  }, [salesData, selectedDateRange, selectedCategory]);

  const handleDateRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setSelectedDateRange((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="dashboard-container">
      <h1>Sales Analytics Dashboard</h1>

      <div className="filters-container">
        <div className="filter">
          <label>Date Range:</label>
          <input
            type="date"
            value={selectedDateRange.startDate}
            onChange={(e) => handleDateRangeChange(e, "startDate")}
          />
          <input
            type="date"
            value={selectedDateRange.endDate}
            onChange={(e) => handleDateRangeChange(e, "endDate")}
          />
        </div>

        <div className="filter">
          <label>Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="charts-container">
        <React.Suspense fallback={<div>Loading charts...</div>}>
          <div className="chart">
            <LineChart salesData={filteredSalesData} />
          </div>
          <div className="chart">
            <BarChart salesData={filteredSalesData} />
          </div>
          <div className="chart">
            <PieChart salesData={filteredSalesData} />
          </div>
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
