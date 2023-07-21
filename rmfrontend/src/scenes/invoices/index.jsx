import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import { getAllPurchasedProducts } from "../../auth/authService.js";
import Header from "../../components/Header";
import { tokens } from "../../theme";



const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [loading, setLoading] = useState(false); // Loading state
    const [allpurchasedproducts, setAllPurchasedProducts] = useState([]);




    // Get all Category data from localStorage or fetch from backend API
    useEffect(() => {
        setLoading(true);
        getAllPurchasedProducts().then((res) => {
            const allpurchasedproductsData = res;
            if (allpurchasedproductsData) {
                setAllPurchasedProducts(allpurchasedproductsData);
            } else {
                fetchData();
            }
            setLoading(false);
        });
    }, []);

    // Fetch all Category data from the backend API
    const fetchData = async () => {
        try {
            const purchasedproducts = await getAllPurchasedProducts();
            setAllPurchasedProducts(purchasedproducts);
            // Save the data in localStorage
            localStorage.setItem('allCategoriesData', JSON.stringify(purchasedproducts));
        } catch (error) {
            // Handle the error
        }
    };

    // Calculate the price for each purchased product item
    const dataWithPrice = allpurchasedproducts.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        purchasedDate: item.purchasedDate,
        name: item.productId.name,
        // Calculate the price by multiplying the productId price with quantity
        price: item.productId.price * item.quantity,
    }));

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "quantity", headerName: "Quantity", flex: 1, cellClassName: "name-cell" },
        { field: "purchasedDate", headerName: "Purchased Date", flex: 1, cellClassName: "name-cell" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-cell" },
        { field: "price", headerName: "Price", flex: 1, cellClassName: "name-cell" }, // New "Price" field
    ];

    return (
        <Box m="20px" >
            <Header title="ONGOING ORDERS" subtitle="List of Ongoing Orders" />
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress sx={{
                        position: 'absolute',
                        top: "50%"
                    }} color="secondary" />
                </Box>) : (
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
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
                            color: "white !important",
                        },
                    }}
                >
                    <DataGrid
                        rows={dataWithPrice}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 80]}
                    />
                </Box>
            )
            }

        </Box>
    )

};

export default Invoices;
