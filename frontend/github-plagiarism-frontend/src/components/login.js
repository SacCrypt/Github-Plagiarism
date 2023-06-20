import { Box, Button, Typography, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate } from "react-router";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";

const Login = ({ user, setUser }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      fetch("/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) =>
        data.json().then((data) => {
          console.log(data);
          if (data["Message"] === "Successful") {
            setUser({ name: formik.values.email.split("@")[0] });
            formik.resetForm();
          }
        })
      );
    },

    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Please type an email !";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Please type a password!";
      }
      return errors;
    },
  });
  const handleCallbackResponse = (response) => {
    var userObj = jwt_decode(response.credential);
    setUser(userObj);
    sessionStorage.setItem("loggedIn", true);
    sessionStorage.setItem("user", JSON.stringify(userObj));
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
  }, [user]);
  if (Object.keys(user).length) {
    return <Navigate to="/" />;
  }
  return (
    <Box
      border="1px solid black"
      padding={5}
      borderRadius="12px"
      margin="auto"
      width="30em"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Typography marginBottom="1em" variant="h4">
        Login
      </Typography>

      {Object.keys(user).length ? (
        ""
      ) : (
        <Box>
          <Box id="googleauth"> </Box>
          <Typography margin="1em 0" color="grey" variant="subtitle2">
            or
          </Typography>
        </Box>
      )}

      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "2em" }}
      >
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
          onBlur={formik.handleBlur}
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          type="password"
          name="password"
          id="password"
          variant="standard"
          label="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button
          sx={{
            border: "2px solid white",
            padding: "3px",
            borderRadius: "15px",
            textAlign: "center",
            backgroundColor: "#3d3af0cc",
            color: "white",
          }}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
