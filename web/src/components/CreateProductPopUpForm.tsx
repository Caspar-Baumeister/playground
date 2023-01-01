import { FormControlLabel, IconButton, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import SecectTags from "./SelectTags";
import { useMutation } from "@apollo/client";
import CREATE_PRODUCT from "../graphql/mutations/createProduct";
import { ShopContext } from "../utiles/ShopContext";

export default function CreateProductPopUpForm() {
  // create product mutation
  const [saveProduct, { error, data }] = useMutation(CREATE_PRODUCT, {});

  const [open, setOpen] = React.useState(false);
  const [tags, setTags] = React.useState<number[]>([]);

  // const [InWeight, setInWeight] = React.useState(1);

  //   const { loading, error, data } = useQuery(MY_SHOPS, {
  //     variables: { limit: 10 },
  //   });

  // const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const validationSchema = yup.object({
    name: yup.string().required("Ein Produktname wird benötigt"),
    amount: yup.number().required("Eine Mengenangabe wird benötigt"),
    // password: yup
    //   .string()
    //   .min(8, "Password should be of minimum 8 characters length")
    //   .required("Password is required"),
  });

  interface valuesTypes {
    name: string;
    shopId: number | undefined;
    amountType: number | undefined;
    amount: number | undefined;
    price: number | undefined;
  }

  const shopState = React.useContext(ShopContext);

  const initialValues: valuesTypes = {
    name: "",
    shopId: shopState?.shop?.id,
    amountType: 0,
    amount: undefined,
    price: undefined,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const response = await saveProduct({
        variables: { ...values, tags: tags },
      });
      console.log(response);
    },
  });

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen} color="secondary">
        Neues Produkt
      </Button> */}
      <Button
        onClick={() => setOpen(true)}
        sx={{ borderRadius: 10 }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Produkt
      </Button>
      {/* <IconButton onClick={() => handleChange(true)} color="default">
        <AddIcon />
      </IconButton> */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Neues Produkt</DialogTitle>

        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Erstelle ein neues Produkt für diesem Shop.
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
            <FormControlLabel
              control={
                <Switch
                  name="amountType"
                  value="1"
                  checked={formik.values.amountType === 1}
                  onChange={(event, checked) => {
                    formik.setFieldValue("amountType", checked ? 1 : 0);
                  }}
                />
              }
              label={
                formik.values.amountType ? "nach Gewicht" : "nach Stückzahl"
              }
            />

            <TextField
              margin="dense"
              fullWidth
              id="price"
              name="price"
              label={
                formik.values.amountType
                  ? "Verkaufspreis pro 100g"
                  : "Verkaufspreis pro Stück"
              }
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />

            <TextField
              margin="dense"
              fullWidth
              id="amount"
              name="amount"
              label={
                formik.values.amountType
                  ? "Menge in Kilo"
                  : "Menge in Stückzahl"
              }
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
            <SecectTags
              handleTagChange={(event) => {
                setTags(event);
                console.log(tags);
              }}
            />
            {error ? (
              <span style={{ color: "green" }}>
                <DialogContentText>
                  Dies ging schief! {error.message}
                </DialogContentText>
              </span>
            ) : null}
            {data && data.createProduct ? (
              <DialogContentText p={3}>
                <span style={{ color: "green" }}>
                  {" "}
                  Das Produkt {data.createProduct.name} wurde erfolgreich
                  erstellt!
                </span>
              </DialogContentText>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Schließen</Button>
            <Button type="submit">Erstellen</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
