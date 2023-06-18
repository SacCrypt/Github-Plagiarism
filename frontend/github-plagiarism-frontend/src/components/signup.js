import {
  Alert,
  Box,
  Button,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

const TransitionSnackbar = (props) => {
  return <Slide {...props} direction="down" />;
};

const SignUp = ({ user, setUser }) => {
  const handleCallbackResponse = (response) => {
    var userObj = jwt_decode(response.credential);
    setUser(userObj);
    sessionStorage.setItem("loggedIn", true);
    sessionStorage.setItem("user", JSON.stringify(userObj));
    <Navigate to="/" />;
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "762588068378-ve9a57a07p0tibu53cdnqtlbprgvg4in.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("googleauth"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  const [status, setStatus] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: (values) => {
      fetch("/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) =>
        data.json().then((data) => {
          console.log(data);
          if (data["Message"] === "Successful") {
            setStatus(true);
            formik.resetForm();
          }
        })
      );
    },

    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (
        !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
          values.password
        )
      ) {
        errors.password = `Passwords must contain:
        \u2022  A minimum of 6 characters.
        \u2022  A minimum of 1 lower case letter [a-z] 
        \u2022  A minimum of 1 upper case letter [A-Z] 
        \u2022  A minimum of 1 numeric character [0-9] 
        \u2022  A minimum of 1 special character:`;
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match!";
      }
      return errors;
    },
  });

  return (
    <>
      {Object.keys(user).length ? (
        <Navigate to="/" />
      ) : (
        <Box
          border="2px solid black"
          padding={5}
          borderRadius="12px"
          margin="auto"
          width="30em"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Snackbar
            color="black"
            TransitionComponent={TransitionSnackbar}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={status}
            autoHideDuration={6000}
            onClose={() => setStatus(false)}
          >
            <Alert
              sx={{ backgroundColor: "#90EE90", color: "black" }}
              severity="success"
            >
              {" "}
              Registration Successful !{" "}
            </Alert>
          </Snackbar>
          <Typography alignSelf="flex-start" variant="h4">
            Get Started Now{" "}
          </Typography>
          <Typography
            color="grey"
            marginLeft="2em"
            alignSelf="flex-start"
            variant="subtitle2"
          >
            {" "}
            Enter your information to register
          </Typography>
          <Box marginTop="1em">
            {Object.keys(user).length ? "" : <Box id="googleauth"> Temp </Box>}
            <Button> Temp </Button>
          </Box>

          <Typography
            marginTop={"2em"}
            marginBottom=".5em"
            color={"grey"}
            variant="subtitle2"
          >
            or
          </Typography>

          <Box padding={5} width={400} margin="auto">
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "2em" }}
            >
              <TextField
                onBlur={formik.handleBlur}
                helperText={formik.touched.name && formik.errors.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                name="name"
                id="name"
                variant="standard"
                label="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <TextField
                onBlur={formik.handleBlur}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                name="email"
                id="email"
                variant="standard"
                label="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <TextField
                sx={{
                  whiteSpace: "pre-line",
                }}
                onBlur={formik.handleBlur}
                helperText={formik.touched.password && formik.errors.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                type="password"
                name="password"
                id="password"
                variant="standard"
                label="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <TextField
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                variant="standard"
                label="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <Button type="submit"> Sign Up</Button>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SignUp;
