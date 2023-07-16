import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { API } from "../../../config.js";


const initialValues = {
    email: "",
    password: "",
}


// yup validation 

const userSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Login = () => {

    const handleFormSubmit = (values) => {
        fetch(`${API}/api/users/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();

                } else {
                    throw new Error("Login failed");
                }
            })
            .then((data) => {
                console.log(data);
                // Handle successful login
            })
            .catch((error) => {
                console.error(error);
                // Handle login error
            });
        window.location.href = "/";
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
                        <PointOfSaleIcon sx={{
                            color: "black",
                            fontSize: "70px",
                        }} />
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
                                    value={values.email}
                                    name="email"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
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
                                    type="password"
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
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
