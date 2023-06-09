import React from "react";
import { Box } from "@mui/material";
import LandingOne from "./landingOne";
import FileUpload from "./fileupload";
import LandingTwo from "./landingTwo";

function Home() {
  return (
    <Box padding={2}>
      <LandingOne />
      <LandingTwo />
      <FileUpload />
    </Box>
  );
}

export default Home;
