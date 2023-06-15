import React, { useContext } from "react";
import { Box } from "@mui/material";
import LandingOne from "./landingOne";
import FileUpload from "./fileupload";
import LandingTwo from "./landingTwo";
import { Context } from "../App";

function Home() {
  const setColor = useContext(Context);
  setColor("primary");
  return (
    <Box padding={2}>
      <LandingOne />
      <LandingTwo />
      <FileUpload />
    </Box>
  );
}

export default Home;
