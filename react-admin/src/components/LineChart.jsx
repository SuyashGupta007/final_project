import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { useTheme } from "@mui/material";

export function LineChart({ isDashboard = false }) {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jsondata");
        const apiData = response.data.myData; // Assuming the API response is an array of data
        // Modify this based on your actual API response structure

        // Convert the API data into the format expected by the LineChart component
        const chartData = [
          ["Year", "Relevance", "Likelihood"],
          ...apiData.map(item => [item.end_year, item.relevance, item.likelihood]),
        ];
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs once on mount

  const options = {
    title: "Relevance and Likelihood Over Years",
    curveType: "function",
    backgroundColor: "transparent",
    titleTextStyle: {
      color: theme.palette.getContrastText(theme.palette.background.default),
    },
  };
  const chartWidth = isDashboard ? "100%" : "100%";
  const chartHeight = isDashboard ? "100px" : "700px";
  return (
    <Chart
      chartType="LineChart"
      data={chartData}
      options={options}
      width={chartWidth}
      height={chartHeight}
    />
  );
}
export default LineChart;