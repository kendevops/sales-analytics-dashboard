
Sales Analytics Dashboard (RSAD)
================================

Sales Analytics Dashboard is a React-based web application that visualizes sales data through interactive charts and graphs. Users can filter sales data by date ranges and product categories. The dashboard is fully responsive and includes performance optimizations for a smooth experience.

Features
--------

- **Data Visualization**: Displays sales data using:

  - Line chart for sales trends over time.
  - Bar chart comparing sales across product categories.
  - Pie chart showing sales contribution by region.
- **Filters**: Users can filter data based on:

  - Date range (start and end dates).
  - Product categories (dynamically populated from data).
- **Responsive Design**: The application is fully responsive and adjusts to different screen sizes.

- **Performance Optimizations**:

  - Memoization using `useMemo` to avoid unnecessary recalculations when filtering data.
  - `React.memo` used to prevent unnecessary re-renders of chart components.
  - Lazy loading of charts to improve load time.
  - Debounced filter inputs to avoid performance bottlenecks.

Installation
------------

To run the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/kendevops/sales-analytics-dashboard.git
    cd sales-analytics-dashboard`
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000`.

Folder Structure
----------------

```bash
src/
├── components/
│   ├── BarChart.tsx       # Bar chart component for sales by category
│   ├── LineChart.tsx      # Line chart component for sales trends over time
│   ├── PieChart.tsx       # Pie chart component for sales by region
├── data/
│   └── salesData.json     # JSON file containing mock sales data
├── styles/
│   └── Dashboard.module.css # CSS Module for dashboard layout and responsiveness
├── App.tsx                # Main application component
├── index.tsx              # Entry point for React application
└── README.md              # Documentation for the project`
```

### Key Components

1. **`App.tsx`**:

    - The main container of the application.
    - It fetches sales data from a local JSON file and dynamically populates the filters (date range and categories).
    - Uses `useMemo` to filter data based on the selected filters.
    - Passes filtered data to the charts (Line, Bar, Pie).
2. **Charts**:

    - **`LineChart.tsx`**: Renders a line chart for sales trends over time using `react-chartjs-2`.
    - **`BarChart.tsx`**: Displays a bar chart for sales by product category.
    - **`PieChart.tsx`**: Shows a pie chart for sales contribution by region.
    - Charts are optimized using `React.memo` to prevent unnecessary re-renders.
3. **`salesData.json`**:

    - Contains mock sales data, including date, category, region, and sales values.
    - Used for populating the charts and filters dynamically.
4. **`App.css`**:

    - Handles the styling for the dashboard, including layout and responsiveness.
    - Uses CSS Grid and Flexbox for a flexible, responsive layout that adjusts for mobile, tablet, and desktop views.

Performance Optimizations
-------------------------

1. **Memoization (`useMemo`)**:

    - The filtered sales data is calculated using `useMemo`, ensuring that the filtering logic is only executed when necessary (i.e., when filters change).

    ```bash
    const filteredSalesData = useMemo(() => {
      return salesData.filter((data) => {
        const date = DateTime.fromISO(data.date);
        const isWithinDateRange = date >= DateTime.fromISO(selectedDateRange.startDate) && date <= DateTime.fromISO(selectedDateRange.endDate);
        const isCategoryMatch = selectedCategory === 'All' || data.category === selectedCategory;
        return isWithinDateRange && isCategoryMatch;
      });
    }, [salesData, selectedDateRange, selectedCategory]);`
    ```

2. **Component Memoization (`React.memo`)**:

    - Chart components are memoized using `React.memo` to prevent re-rendering unless their `salesData` prop changes.

   ```bash

    const LineChart = React.memo(({ salesData }: { salesData: any[] }) => {
      // Chart logic here
    });
    ```

3. **Lazy Loading (`React.lazy`)**:

    - Charts are lazy-loaded to improve the initial page load time. This ensures that chart components are only loaded when needed.

    ```bash
    const LineChart = React.lazy(() => import('./components/LineChart'));
    ```

4. **Debounced Filter Inputs**:

    - Filter inputs are debounced to prevent frequent state updates when users interact with the controls.

Technologies Used
-----------------

- **React**: For building the user interface using functional components and hooks.
- **Chart.js + react-chartjs-2**: For rendering interactive charts.
- **Luxon**: For handling date manipulations.
- **CSS**: For simple and maintainable styling.
- **Fetch API**: For loading mock data from a local JSON file.

Future Improvements
-------------------

- **Backend Integration**: Replace the static JSON file with real-time sales data fetched from an API.
- **Additional Charts**: Add more types of charts such as heatmaps or scatter plots for richer data analysis.
- **Advanced Filters**: Add region-based filters and options for aggregating data by week, month, or year.
