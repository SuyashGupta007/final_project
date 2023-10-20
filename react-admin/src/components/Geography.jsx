import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { useTheme } from "@mui/material";


const Geography = ({ isDashboard = false }) => {
  const theme = useTheme();
  const [geoChartData, setGeoChartData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jsondata");
        const apiData = response.data.myData; 
       

        // Convert the API data into the format expected by the GeoChart component
        const geoChartData = [["Country", "Likelihood"], ...apiData.map(item => [item.country, item.likelihood])];

      

      setGeoChartData(geoChartData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const geoChartOptions = {
    title: "Geographical Likelihood Distribution",
    region: "world", // You can change this based on the region you want to display
    colorAxis: { colors: theme.palette.mode === "dark" ? ["#ff7e67", "#5ec962"] : ["#5ec962", "#ff7e67"] },
    backgroundColor: "transparent",
    datalessRegionColor: theme.palette.mode === "dark" ? "#444" : "#eee",
    defaultColor: theme.palette.mode === "dark" ? "#666" : "#ccc",
    legend: "none",
  };
  const chartWidth = isDashboard ? "100%" : "100%";
  const chartHeight = isDashboard ? "150px" : "700px";

  return (
    <div>
      <Chart
        chartType="GeoChart"
        data={geoChartData}
        options={geoChartOptions}
        width={chartWidth}
        height={chartHeight}
      />
      </div>
  )
}

export default Geography