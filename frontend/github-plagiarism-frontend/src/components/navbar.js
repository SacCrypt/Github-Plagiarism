import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";

function Navbar({ color, user, setUser }) {
  const handleSignOut = () => {
    setUser({});
    sessionStorage.setItem("loggedIn", false);
  };
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
          backgroundColor: color,
          padding: 1,
          marginBottom: "5em",
        }}
        position="static"
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} component="div" variant="h4">
            <Link style={{ textDecoration: "None", color: "inherit" }} to={"/"}>
              Verity
            </Link>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button sx={customButtonStyle}> Features </Button>
            <Button sx={customButtonStyle}>About</Button>
            {Object.keys(user).length ? (
              <Stack gap={1} direction="column" alignItems="center">
                {user.picture ? (
                  <Avatar
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      width: 40,
                      height: 40,
                    }}
                    alt="user"
                    src={user.picture}
                  ></Avatar>
                ) : (
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {user.name[0]}
                  </Avatar>
                )}

                <Button
                  onClick={handleSignOut}
                  sx={{
                    ...customButtonStyle,
                    fontSize: "10px",
                    "&:hover": {
                      color: "red",
                    },
                  }}
                  color="inherit"
                >
                  Sign-Out
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" gap="1em">
                <Button sx={customButtonStyle} color="inherit">
                  <Link
                    style={{ textDecoration: "None", color: "inherit" }}
                    to={"/signup"}
                  >
                    Sign-Up
                  </Link>
                </Button>
                <Button sx={customButtonStyle}>
                  {" "}
                  <Link
                    style={{ textDecoration: "None", color: "inherit" }}
                    to={"/login"}
                  >
                    Login
                  </Link>
                </Button>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
