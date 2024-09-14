import React, { useState, useEffect, useMemo } from "react";
import { DateTime } from "luxon";
import "./App.css";

// Lazy load chart components to improve performance.
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
  const [salesData, setSalesData] = useState<SalesDataProps[]>([]); // State to hold the sales data fetched from the JSON file.
  const [categories, setCategories] = useState<string[]>([]); // State to store unique categories from the data for filtering.

  // State to manage the selected date range for filtering sales data.
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: DateTime.now().minus({ months: 1 }).toISODate(), // Default to one month ago.
    endDate: DateTime.now().toISODate(), // Default to today's date.
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  // useEffect to fetch sales data when the component mounts.
  useEffect(() => {
    fetch("/salesData.json")
      .then((response) => response.json())
      .then((data: SalesDataProps[]) => {
        setSalesData(data); // Set the fetched data to state.

        // Extract unique categories from the data.
        const uniqueCategories = Array.from(
          new Set(data.map((item: any) => item.category))
        );
        setCategories(uniqueCategories); // Update the category filter options.
      })
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []); // Empty dependency array means this effect runs once when the component mounts.

  // useMemo to filter the sales data based on the selected date range and category.
  // This is memoized so the filtering is only recalculated when the salesData, selectedDateRange, or selectedCategory changes.
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

  // Function to handle changes to the date range filter.
  const handleDateRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setSelectedDateRange((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Function to handle changes to the category filter.
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
