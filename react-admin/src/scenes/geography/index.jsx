import { Box } from "@mui/material";
import Header from "../../components/Header";
import Geography from "../../components/Geography";

const geography = () => {
  return (
    <Box m="20px">
      <Header title="Geography Chart" subtitle="Simple Geography Chart" />
      <Box height="75vh">
        <Geography />
      </Box>
    </Box>
  );
};

export default geography;