import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { userSchema, userValues } from "../../schema";
import { postApiMethod } from "../../Api";
import { ToastContainer, toast } from "react-toastify";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isDisabled, setisDisabled] = React.useState(false);
  const formik = useFormik({
    initialValues: userValues,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      setisDisabled(true)
      const { email, password, name, phone, isVerified } = values
      const postUser = await postApiMethod('user/signup', { email, password, name, phone, isVerified })
      if (postUser?.status === 200) {
        toast.success(`${'User Added Successfully'}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        formik.resetForm()
      } else {
        toast.error(`User Already Exist`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setisDisabled(false)
    }
  })

  return (
    <Box m="20px">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
      />
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            error={!!formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            error={!!formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            error={!!formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            error={!!formik.touched.phone && !!formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{ gridColumn: "span 2" }}
          />

        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained" disabled={isDisabled}>
            Create New User
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default Form;