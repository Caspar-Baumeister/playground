import { useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { FormControlLabel, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { ADD_EMPLOYEE } from "../graphql/mutations/user";
import { SHOP_WITH_USERS } from "../graphql/queries/shop";

export default function CreateUserPopUpForm() {
  // create User mutation
  const [createUser, { error, data }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: SHOP_WITH_USERS }],
  });

  const [open, handleChange] = React.useState(false);

  const validationSchema = yup.object({
    name: yup.string().required("Ein Name wird benötigt"),
  });

  interface valuesTypes {
    name: string;
    email: string;
    password: string;
    role: number;
  }

  const initialValues: valuesTypes = {
    name: "",
    email: "",
    password: "",
    role: 2,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

      const response = await createUser({ variables: values });

      console.log("response", response);
    },
  });

  return (
    <div>
      <Button
        onClick={() => handleChange(true)}
        sx={{ borderRadius: 10 }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Mitarbeiter
      </Button>

      <Dialog open={open} onClose={() => handleChange(false)}>
        <DialogTitle>Neuer Mitarbeiter</DialogTitle>

        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Füge deinem Geschäft einen neunen Mitarbeiter hinzu.
            </DialogContentText>

            <TextField
              margin="dense"
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              multiline
              margin="dense"
              fullWidth
              id="email"
              name="email"
              label={"Email Adresse"}
              type="number"
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              multiline
              margin="dense"
              fullWidth
              id="password"
              name="password"
              label={"Passwort"}
              type="number"
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={
                <Switch
                  name="role"
                  value="1"
                  checked={formik.values.role === 1}
                  onChange={(event, checked) => {
                    formik.setFieldValue("role", checked ? 1 : 2);
                  }}
                />
              }
              label={"Berechtigung zum Märkte planen"}
            />

            {error ? (
              <span style={{ color: "green" }}>
                <DialogContentText>
                  Dies ging schief! {error.message}
                </DialogContentText>
              </span>
            ) : null}
            {data && data.addEmployee ? (
              <DialogContentText p={3}>
                <span style={{ color: "green" }}>
                  Glückwunsch. {formik.values.name} ist nun ein Teil des Teams!
                </span>
              </DialogContentText>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleChange(false)}>Schließen</Button>
            <Button type="submit">Erstellen</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
