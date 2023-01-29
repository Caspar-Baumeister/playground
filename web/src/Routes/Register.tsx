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
import { REGISTER } from "../graphql/mutations/user";
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
  name: yup.string().required("Name is required"),
});

export default function Register() {
  const [responseError, setResponseError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [register] = useMutation(REGISTER);
  const theme = createTheme();
  const formik = useFormik({
    initialValues: {
      name: "caspar",
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setResponseError({
        name: "",
        email: "",
        password: "",
      });
      var response;
      try {
        response = await register({ variables: values });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      if (response?.data?.register.errors) {
        console.log(response.data.register.errors);
        var errorMap: Record<string, string> = toErrorMap(
          response.data.register.errors
        );
        setResponseError({
          name: errorMap["name"],
          email: errorMap["email"],
          password: errorMap["password"],
        });
      } else if (response?.data.register.user) {
        // a cooky is saved trough the successfull register function
        navigate("/inventory");
      } else {
        return response;
      }
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
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={
                (formik.touched.name && Boolean(formik.errors.name)) ||
                Boolean(responseError.name)
              }
              helperText={
                (Boolean(responseError.name) && responseError.name) ||
                (formik.touched.name && formik.errors.name)
              }
            />
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
