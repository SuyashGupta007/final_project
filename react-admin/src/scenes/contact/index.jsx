import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const columns = [
  { field: 'end_year', headerName: 'End Year', flex: 1 },
  { field: 'intensity', headerName: 'Intensity', flex: 1 },
  { field: 'likelihood', headerName: 'Likelihood', flex: 1 },
  { field: 'relevance', headerName: 'Relevance', flex: 1 },
  { field: 'start_year', headerName: 'Start Year', flex: 1 },
  { field: 'country', headerName: 'Country', flex: 1 },
  { field: 'topic', headerName: 'Topics', flex: 1 },
  { field: 'region', headerName: 'Region', flex: 1 },
  ]

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jsondata');
      console.log('API Response:', response.data.myData);
      
      setData(response.data.myData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box m="20px">
      <Header title="DATA" subtitle="Managing the Data"/>
      <Box 
         m="40px 0 0 0" 
         height="75vh"
        sx={{
            "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiDatagrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },

            }}
        >
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          getRowId={(row) => row._id} 
          components={{Toolbar:GridToolbar}}
        />
      </Box>
    </Box>
  );
};

export default Index;
