import React, { useState, useMemo } from "react";
import { DateTime } from "luxon";
import "./styles/Dashboard.module.css";
import { salesData } from "./data/salesData";
const LineChart = React.lazy(() => import("./components/LineChart"));
const BarChart = React.lazy(() => import("./components/BarChart"));
const PieChart = React.lazy(() => import("./components/PieChart"));

const App = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: DateTime.now().minus({ months: 1 }).toISODate(),
    endDate: DateTime.now().toISODate(),
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

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
  }, [selectedDateRange, selectedCategory]);

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
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
      </div>

      <div className="charts-container">
        <React.Suspense fallback={<div>Loading charts...</div>}>
          <LineChart salesData={filteredSalesData} />
          <BarChart salesData={filteredSalesData} />
          <PieChart salesData={filteredSalesData} />
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
