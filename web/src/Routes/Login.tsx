import { gql, useMutation } from "@apollo/client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toErrorMap } from "../utiles/toErrorMap";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`;

export default function Login() {
  const [responseError, setResponseError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN);
  const theme = createTheme();
  const formik = useFormik({
    initialValues: {
      email: "foo2@bar.com",
      password: "foobar123",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setResponseError({
        email: "",
        password: "",
      });
      var response;
      try {
        response = await login({ variables: values });
      } catch (error) {
        console.log(error);
      }
      if (response?.data?.login.errors) {
        var errorMap: Record<string, string> = toErrorMap(
          response.data.login.errors
        );
        setResponseError({
          email: errorMap["email"],
          password: errorMap["password"],
        });
      } else if (response?.data.login.user) {
        // a cooky is saved trough the successfull login function
        navigate("/");
      }
      return response;
    },
  });

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={
                (formik.touched.email && Boolean(formik.errors.email)) ||
                Boolean(responseError.email)
              }
              helperText={
                (Boolean(responseError.email) && responseError.email) ||
                (formik.touched.email && formik.errors.email)
              }
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                (formik.touched.password && Boolean(formik.errors.password)) ||
                Boolean(responseError.password)
              }
              helperText={
                (Boolean(responseError.password) && responseError.password) ||
                (formik.touched.password && formik.errors.password)
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
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
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
