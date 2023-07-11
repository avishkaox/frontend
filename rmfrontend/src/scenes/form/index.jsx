import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Phone: "",
    Address: "",
    City: "",
    State: "",
    Country: "",
}

const userSchema = Yup.object().shape({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Password: Yup.string().required("Password is required"),
    ConfirmPassword: Yup.string().required("Confirm Password is required"),
    Phone: Yup.string().required("Phone is required"),
    Address: Yup.string().required("Address is required"),
    City: Yup.string().required("City is required"),
    State: Yup.string().required("State is required"),
    Country: Yup.string().required("Country is required"),
});

const Form = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const handleFormSubmit = (values) => {
        console.log(values);
    }

    return (
        <Box m="20px" >
            <Header title="CREATE USER" subtitle="Create a new User Profile" />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4 , minmax( 0 , 1fr))"
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile ? undefined : "span 4"
                                }
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.FirstName}
                                name="FirstName"
                                error={touched.FirstName && Boolean(errors.FirstName)}
                                helperText={touched.FirstName && errors.FirstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.LastName}
                                name="LastName"
                                error={touched.LastName && Boolean(errors.LastName)}
                                helperText={touched.LastName && errors.LastName}
                                sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Email}
                                name="Email"
                                error={touched.Email && Boolean(errors.Email)}
                                helperText={touched.Email && errors.Email}
                                sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Password}
                                name="Password"
                                error={touched.Password && Boolean(errors.Password)}
                                helperText={touched.Password && errors.Password}
                                sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Confirm Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ConfirmPassword}
                                name="ConfirmPassword"
                                error={touched.ConfirmPassword && Boolean(errors.ConfirmPassword)}
                                helperText={touched.ConfirmPassword && errors.ConfirmPassword}
                                sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Phone}
                                name="Phone"
                                error={touched.Phone && Boolean(errors.Phone)}
                                helperText={touched.Phone && errors.Phone}
                                sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Address}
                                name="Address"
                                error={touched.Address && Boolean(errors.Address)}
                                helperText={touched.Address && errors.Address}
                                sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="City"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.City}
                                name="City"
                                error={touched.City && Boolean(errors.City)}
                                helperText={touched.City && errors.City}
                                sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="State"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.State}
                                name="State"
                                error={touched.State && Boolean(errors.State)}
                                helperText={touched.State && errors.State}
                                sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Country"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Country}
                                name="Country"
                                error={touched.Country && Boolean(errors.Country)}
                                helperText={touched.Country && errors.Country}
                                sx={{ gridColumn: "span 2" }}
                                />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px" >
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                            >
                                Create New User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )

}

export default Form;
