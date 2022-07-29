import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import AuthService from "../Services/AuthService";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../Store/Slice/UserSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const initialValue = { email: "", password: "" };

  const dispatch = useDispatch();

  let tokens = useSelector((cv) => cv.user.tokens);
  console.log(tokens);

  const [change, setChange] = useState(initialValue);
  
  const navigate = useNavigate();

  useEffect(() => {
    let userToken = localStorage.getItem("token");
    dispatch(getToken(userToken));
  }, [dispatch]);

  useEffect(() => {
    if (tokens) {
      console.log("localstorage", localStorage);
      navigate("/homepage");
    }
  }, [navigate, tokens]);

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setChange((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const validaton = () => {
    let isvalid = true;
    if (change.email === "") {
      isvalid = false;
      alert("pls enter your email id");
    } else if (change.password === "") {
      isvalid = false;
      alert("pls enter your password");
    } else {
      const validator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!validator.test(change.email)) {
        isvalid = false;
        alert("pls enter a valid email id");
      }
    }
    return isvalid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setFormErrors(validate(change));
    // setIsSubmit(true);

    if (validaton()) {
      AuthService(change)
        .then((data) => {
          // submitPage(data.token);
          console.log("submitpage", data.token);

          localStorage.setItem("token", data.token);

          dispatch(getToken(data.token));
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: blue[700] }}>
            <AssignmentIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={change.email}
              onChange={inputHandler}
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={inputHandler}
              value={change.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
// eve.holt@reqres.in
// cityslicka
