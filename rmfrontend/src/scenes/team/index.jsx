import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { getAllUser } from "../../auth/authService.js";
import { API } from "../../config.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State to hold the allUsers data
    const [allUsers, setAllUsers] = React.useState([]);

    // Get all user data 
    const fetchData = async () => {
        try {
            const users = await getAllUser();
            setAllUsers(users);
        } catch (error) {
            // Handle the error
        }
    };

    // Call the fetchData function when the component mounts
    React.useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-cell" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "registerid", headerName: "Register Id", flex: 1 },
        {
            field: "role",
            headerName: "Access Level",
            flex: 1,
            cellClassName: "access-cell",
            renderCell: ({ row }) => {
                const handleRowClick = () => {
                    setSelectedUser(row);
                    setOpenFormDialog(true);
                };

                return (
                    <Box
                        width="60%"
                        m="0px auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            row.role === 'manager'
                                ? colors.greenAccent[600]
                                : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                        style={{ cursor: 'pointer' }}
                        onClick={handleRowClick}
                    >
                        {row.role === 'manager' && <AdminPanelSettingsOutlinedIcon />}
                        {row.role === 'employee' && <PersonOutlineOutlinedIcon />}
                        {row.role === 'cashier' && <PointOfSaleOutlinedIcon />}
                        {row.role === 'chef' && <LocalDiningOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }} >
                            {row.role}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        phone: Yup.string().required('Phone Number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        registerid: Yup.string().required('Register Id is required'),
        role: Yup.string().required('Access Level is required'),
    });

    const [selectedUser, setSelectedUser] = React.useState(null);
    const [openFormDialog, setOpenFormDialog] = React.useState(false);
    console.log(selectedUser && selectedUser);
    

    const handleFormSubmit = async (values) => {
        
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("role", values.role);

       
        // check if the form filed are empty
        if (values.name === '' && values.email === '' && values.phone === '' ) {
            toast.error("Please fill all the fields");
            return;
        }

        try {
            const response = await fetch(`${API}/api/users/updateuser/${selectedUser._id}`, {
                method: "PATCH",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                toast.success("User Updated successfully!", {
                    // position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || "User Updating failed";
                toast.error(errorMessage, {
                    // position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred. Please try again.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setOpenFormDialog(false);
    };

    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the team Members" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={
                    {
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeader": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiDataGrid-panelFooter button": {
                            color: "white !!important",
                        }
                    }
                }
            >
                <DataGrid
                    rows={allUsers}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 80]}
                />
            </Box>

            <Dialog open={openFormDialog} onClose={() => setOpenFormDialog(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={selectedUser}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Box my={2}>
                                    <Typography>Name</Typography>
                                    <Field type="text" name="name" />
                                    {errors.name && touched.name && <Typography>{errors.name}</Typography>}
                                </Box>
                                <Box my={2}>
                                    <Typography>Phone Number</Typography>
                                    <Field type="text" name="phone" />
                                    {errors.phone && touched.phone && <Typography>{errors.phone}</Typography>}
                                </Box>
                                <Box my={2}>
                                    <Typography>Email</Typography>
                                    <Field type="email" name="email" />
                                    {errors.email && touched.email && <Typography>{errors.email}</Typography>}
                                </Box>
                                <Box my={2}>
                                    <Typography>Access Level</Typography>
                                    <Field as="select" name="role">
                                        <option value="">Select Access Level</option>
                                        <option value="manager">Manager</option>
                                        <option value="employee">Employee</option>
                                        <option value="cashier">Cashier</option>
                                        <option value="chef">Chef</option>
                                    </Field>
                                    {errors.role && touched.role && <Typography>{errors.role}</Typography>}
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFormDialog(false)}>Cancel</Button>
                    <Button onClick={handleFormSubmit} type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Team;
