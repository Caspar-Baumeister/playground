import { useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
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
import CREATE_TAG from "../graphql/mutations/tag";
import TAGS_OF_SHOP from "../graphql/queries/tag";

export default function CreateTagPopUpForm() {
  // create tag mutation
  const [saveTag, { error, data }] = useMutation(CREATE_TAG, {
    refetchQueries: [
      { query: TAGS_OF_SHOP }, // DocumentNode object parsed with gql
    ],
  });

  const [open, handleChange] = React.useState(false);

  const validationSchema = yup.object({
    name: yup.string().required("Ein Produktname wird benötigt"),
  });

  interface valuesTypes {
    name: string;
    description: string | undefined;
  }

  const initialValues: valuesTypes = {
    name: "",
    description: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await saveTag({ variables: values });
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
        Tag
      </Button>

      <Dialog open={open} onClose={() => handleChange(false)}>
        <DialogTitle>Neuer Tag</DialogTitle>

        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Erstelle einen Neuen Tag den du als Produkt beschreibung benutzen
              kannst.
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
              id="description"
              name="description"
              label={"Beschreibung des Tags"}
              type="number"
              value={formik.values.description}
              onChange={formik.handleChange}
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            {error ? (
              <span style={{ color: "green" }}>
                <DialogContentText>
                  Dies ging schief! {error.message}
                </DialogContentText>
              </span>
            ) : null}
            {data && data.createTag ? (
              <DialogContentText p={3}>
                <span style={{ color: "green" }}>
                  {" "}
                  Der Tag {data.createTag.name} wurde erfolgreich erstellt!
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
