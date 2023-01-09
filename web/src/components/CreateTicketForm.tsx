import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";

import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { createTicketData } from "../Routes/CreateTickets";
import SecectPos from "./SelectPos";

interface CreateTicketFormPropType {
  data: createTicketData;
  setData(field: string, value: number | string): boolean;
}

export default function CreateTicketForm(props: CreateTicketFormPropType) {
  const [selectedDate, handleDateChange] = useState(new Date());

  const validationSchema = yup.object({
    name: yup.string().required("Ein Produktname wird benötigt"),
    amount: yup.number().required("Eine Mengenangabe wird benötigt"),
    // password: yup
    //   .string()
    //   .min(8, "Password should be of minimum 8 characters length")
    //   .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: props.data,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      //   const response = await saveProduct({
      //     variables: { ...values, tags: tags },
      //   });
      //   console.log(response);
    },
  });

  return (
    // select User
    // select Position
    // datepicker Date
    // number field startMoney
    // text field startCommend
    <div>
      <form onSubmit={formik.handleSubmit}>
        <SecectPos
          handlePosChange={(event) => {
            // setTags(event);
            console.log(event);
          }}
          initialPos={undefined}
        />
        <DatePicker
          onChange={() => console.log("onchange clicked")}
          label="Basic example"
          value={selectedDate}
          renderInput={(props) => <TextField {...props} />}
        />
        <TextField
          multiline
          margin="dense"
          fullWidth
          id="startComment"
          name="startComment"
          label={"Kommentar"}
          type="text"
          value={formik.values.startComment}
          onChange={formik.handleChange}
          error={
            formik.touched.startComment && Boolean(formik.errors.startComment)
          }
          helperText={formik.touched.startComment && formik.errors.startComment}
        />
      </form>
    </div>
  );
}
