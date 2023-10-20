import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { Chart } from "react-google-charts";
import axios from "axios";
import { tokens } from "../theme";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jsondata/jsondatawithlimit');
        console.log(response.data.myData)
        setPieData(response.data.myData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    title: "Activities",
    is3D: true,
    backgroundColor: theme.palette.background.default, // Use Material-UI theme for background color
    titleTextStyle: {
      color: colors.blueAccent[500],
    },
  };
  const chartWidth = isDashboard ? "100%" : "100%";
  const chartHeight = isDashboard ? "150px" : "700px";
  return (
    <Chart
      chartType="PieChart"
      data={[["Task", "Hours per Day"], ...pieData.map(item => [item.title, item.intensity])]}
      options={options}
      width={chartWidth}
      height={chartHeight}
    />
  );
};

export default PieChart;