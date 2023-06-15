import React, { useContext, useRef } from "react";
import { Box } from "@mui/material";
import LandingOne from "./landingOne";
import FileUpload from "./fileupload";
import LandingTwo from "./landingTwo";
import { Context } from "../App";

function Home() {
  const setColor = useContext(Context);
  setColor("primary");
  const focusComponent = useRef(null);

  return (
    <Box padding={2}>
      <LandingOne focusComponent={focusComponent} />
      <LandingTwo />
      <FileUpload ref={focusComponent} />
    </Box>
  );
}

export default Home;
