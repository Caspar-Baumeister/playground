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
import CREATE_POINT_OF_SELL from "../graphql/mutations/pos";
import { ShopContext } from "../utiles/ShopContext";

export default function CreatePosPopUpForm() {
  const shopState = React.useContext(ShopContext);

  // create tag mutation
  const [savePos, { error, data }] = useMutation(CREATE_POINT_OF_SELL, {
    // refetchQueries: [
    //   { query: POS_BY_SHOP_ID, variables: { shopId: shopState?.shop?.id } }, // DocumentNode object parsed with gql
    // ],
  });

  const [open, handleChange] = React.useState(false);

  const validationSchema = yup.object({
    name: yup.string().required("Ein Name wird benötigt"),
  });

  interface valuesTypes {
    name: string;
    shopId: number | undefined;
  }

  const initialValues: valuesTypes = {
    name: "",
    shopId: shopState?.shop?.id,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: valuesTypes) => {
      const response = await savePos({ variables: values });
    },
  });

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen} color="secondary">
        Neues Produkt
      </Button> */}
      <Button
        onClick={() => handleChange(true)}
        sx={{ borderRadius: 10 }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Position
      </Button>
      {/* <IconButton onClick={() => handleChange(true)} color="default">
        <AddIcon />
      </IconButton> */}
      <Dialog open={open} onClose={() => handleChange(false)}>
        <DialogTitle>Neue Position</DialogTitle>

        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Erstelle eine neue Position an der verkauft wird
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

            {error ? (
              <span style={{ color: "green" }}>
                <DialogContentText>
                  Dies ging schief! {error.message}
                </DialogContentText>
              </span>
            ) : null}
            {data && data.createPointOfSell ? (
              <DialogContentText p={3}>
                <span style={{ color: "green" }}>
                  {" "}
                  Die Position {data.createPointOfSell.name} wurde erfolgreich
                  erstellt!
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
