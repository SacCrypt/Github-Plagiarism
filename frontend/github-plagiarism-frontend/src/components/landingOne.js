import { Box, Button, Typography } from "@mui/material";
import React from "react";

function LandingOne({ focusComponent }) {
  return (
    <Box
      sx={{
        marginBottom: "5em",
      }}
    >
      <Typography
        marginTop={3}
        marginLeft={2}
        fontFamily={"Geologica"}
        color="grey"
      >
        {" "}
        Enhance Teaching With{" "}
      </Typography>
      <Typography
        marginLeft={3}
        marginTop={2}
        width={850}
        fontFamily={"Geologica"}
        variant="h3"
      >
        Plagiarism Checker . <br /> Detecting Software Plagiarism With Fancy
        Algorithms .
        <Button
          onClick={() =>
            focusComponent.current.scrollIntoView({ behaviour: "smooth" })
          }
          sx={{
            padding: 1.5,
            fontSize: 20,
            marginLeft: "2.5em",
            borderRadius: "15px",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
          color="secondary"
          variant="contained"
        >
          Start Analyzing
        </Button>
      </Typography>
    </Box>
  );
}

export default LandingOne;
