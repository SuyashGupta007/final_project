import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const [barData, setBarData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jsondata/jsondatawithlimit', {
        
        });
  
        setBarData(response.data.myData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setBarData([]); 
      }
    };
  
    fetchData();
  }, []); // Run the effect only once on mount

  // Check if barData is not yet fetched or is empty
  if (!barData || barData.length === 0) {
    return <div>Loading...</div>; 
  }

   const colors = theme.palette.mode === "dark" ? ["#61dafb", "#ff7e67", "#5ec962", "#ffd700", "#ff8c00", "#a17cff"] : ["#61dafb", "#ff7e67", "#5ec962", "#ffd700", "#ff8c00", "#a17cff"];

  return (

    <ResponsiveBar
      data={barData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.text.primary,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.text.primary,
            },
            text: {
              fill: theme.palette.text.primary,
            },
          },
          legend: {
            text: {
              fill: theme.palette.text.primary,
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.text.primary,
          },
        },
      }}
      keys={["intensity", "relevance", "likelihood"]} 
      indexBy="country" 
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: colors[0],
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: colors[1],
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickValue:5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country",
        legendPosition: "middle",
        legendOffset: isDashboard ? 5 : 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Intensity", 
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`}
    />
  );
};

export default BarChart;
