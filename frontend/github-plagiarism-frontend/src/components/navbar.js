import React from "react";
import { AppBar, Toolbar, Typography, Stack, Button, Box } from "@mui/material";

function Navbar() {
  const customButtonStyle = {
    fontSize: 16,
    fontWeight: "bold",
    color: "inherit",
    "&:hover": {
      color: "black",
    },
  };
  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: "primary",
          padding: 1,
          marginBottom: "5em",
        }}
        position="static"
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} component="div" variant="h4">
            Plagiarism Checker
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button sx={customButtonStyle}> Features </Button>
            <Button sx={customButtonStyle}>About</Button>
            <Button sx={customButtonStyle} color="inherit">
              {" "}
              Sign-Up
            </Button>
            <Button sx={customButtonStyle}> Login </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
