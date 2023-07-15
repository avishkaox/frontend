import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LockOpenIcon from '@mui/icons-material/LockOpen';


const initialValues = {
    Email: "",
    Password: "",
}


// yup validation 

const userSchema = Yup.object().shape({
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Password: Yup.string().required("Password is required"),
});

const Login = () => {

    const handleFormSubmit = (values) => {
        console.log(values);
    }

    return (
        <Box className="login-view">
            <Box className="sideview">

            </Box>
            <Box className="formview">
                <Typography
                    variant="h4"
                    className="form-title"
                >
                    <Box display="flex" sx={{
                        color: "#b085d7",
                        fontSize: "41px",
                        fontWeight: "bold",
                        flexDirection: "column",
                        alignItems: "center",
                    }}  >
                        <PointOfSaleIcon sx={{   color: "black",
                        fontSize: "70px", }} />
                        POS Login
                    </Box>
                </Typography>
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
                            >
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
                                    sx={{
                                        gridColumn: "span 2", color: "black !important", "& .MuiFilledInput-input": {
                                            color: `black !important`,
                                            background: "#ababab78",
                                            marginBottom: "12px",
                                            borderRadius: "5px",
                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Password}
                                    name="Password"
                                    error={touched.Password && Boolean(errors.Password)}
                                    helperText={touched.Password && errors.Password}
                                    sx={{
                                        gridColumn: "span 2", color: "black !important", "& .MuiFilledInput-input": {
                                            color: `black !important`,
                                            background: "#ababab78",
                                            marginBottom: "12px",
                                            borderRadius: "5px",
                                        }
                                    }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px" >
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    sx={{
                                        fontSize: "16px",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: "11px",
                                        background: "#0000ffab",
                                        color: "white",
                                        width: "100%",
                                    }}
                                >
                                    Login <LockOpenIcon />
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box >
        </Box >
    )

}

export default Login;