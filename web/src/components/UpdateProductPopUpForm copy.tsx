import { FormControlLabel, IconButton, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import SecectTags from "./SelectTags";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { UPDATE_PRODUCT } from "../graphql/mutations/product";
import { ShopContext } from "../utiles/ShopContext";
import PRODUCTS_BY_SHOP_ID, { PRODUCT } from "../graphql/queries/product";
import { TagsData } from "./TableProducts";

type propsType = {
  productId: number;
};

export const UpdateProductPopUpForm: React.FC<propsType> = (props) => {
  const shopState = React.useContext(ShopContext);

  const [
    getProduct,
    { loading: loadingProduct, error: errorProduct, data: dataProduct },
  ] = useLazyQuery(PRODUCT, {
    variables: { id: props.productId },
  });

  // update product mutation
  const [
    updateProduct,
    { error: errorUpdateProduct, data: dataUpdateProduct },
  ] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [
      {
        query: PRODUCTS_BY_SHOP_ID,
        variables: { shopId: shopState?.shop?.id },
      },
    ],
  });

  const [open, setOpen] = React.useState(false);
  const [tags, setTags] = React.useState<number[]>([]);

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
    tags: TagsData[];
  }

  const initialValues: valuesTypes = {
    name: "",
    shopId: shopState?.shop?.id,
    amountType: 0,
    amount: undefined,
    price: undefined,
    tags: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      const response = await updateProduct({
        variables: { ...values, tags: tags, id: props.productId },
      });
      console.log(response);
    },
  });

  React.useEffect(() => {
    if (dataProduct) {
      const realInitialValues: valuesTypes = dataProduct.product;
      console.log("type", realInitialValues.amountType);
      formik.setFieldValue("name", realInitialValues.name);
      formik.setFieldValue("amount", realInitialValues.amount);
      formik.setFieldValue("price", realInitialValues.price);
      formik.setFieldValue("tags", realInitialValues.tags);
      formik.setFieldValue("amountType", realInitialValues.amountType);

      if (realInitialValues.tags) {
        setTags(realInitialValues.tags.map((tag) => tag.id));
      }
    }
  }, [dataProduct]);

  return (
    <>
      <IconButton
        size="small"
        onClick={() => {
          getProduct();
          setOpen(true);
        }}
      >
        <EditIcon sx={{ fontSize: "18px" }} />
      </IconButton>
      <Dialog
        open={open && !loadingProduct && dataProduct}
        onClose={() => setOpen(false)}
      >
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
                  color="default"
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
              initialTags={tags}
            />
            {errorProduct ? (
              <span style={{ color: "green" }}>
                <DialogContentText>
                  Dies ging schief! {errorProduct.message}
                </DialogContentText>
              </span>
            ) : null}
            {dataUpdateProduct && dataUpdateProduct.product ? (
              <DialogContentText p={3}>
                <span style={{ color: "green" }}>
                  {" "}
                  Das Produkt {dataUpdateProduct.product.name} wurde erfolgreich
                  erstellt!
                </span>
              </DialogContentText>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Schließen</Button>
            <Button type="submit">Bestätigen</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
