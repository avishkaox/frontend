import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import { getAllPurchasedProducts, getAllItems } from "../../auth/authService.js";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [loading, setLoading] = useState(false); // Loading state
    const [allpurchasedproducts, setAllPurchasedProducts] = useState([]);
    const [allItems, setAllItem] = useState([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([getAllPurchasedProducts(), getAllItems()])
            .then(([purchasedproducts, items]) => {
                setAllPurchasedProducts(purchasedproducts);
                setAllItem(items);
            })
            .catch((error) => {
                // Handle the error
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    // Calculate the total price for each purchased product item
    const dataWithPrice = allpurchasedproducts.map((item) => {
        // Calculate the total price by summing the price of all items in the items array
        const totalPrice = item.productId.items.reduce((acc, curItem) => {
            // Find the item from allItems that matches the current item's itemId
            const matchedItem = allItems.find((allItem) => allItem._id === curItem.itemId._id);
            // Add the price of the matched item multiplied by the current item's quantity to the accumulator
            return acc + matchedItem.price * curItem.quantity;
        }, 0);

        return {
            id: item.id,
            quantity: item.quantity,
            purchasedDate: item.purchasedDate,
            name: item.productId.name,
            price: item.productId.price * item.quantity,
            totalprice: totalPrice * item.quantity,
            profit: item.productId.price * item.quantity - totalPrice * item.quantity,
        };
    });

    const totalProfit = dataWithPrice.reduce((acc, item) => acc + item.profit, 0);
    const totalIncome = dataWithPrice.reduce((acc, item) => acc + item.totalprice, 0);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-cell" },
        { field: "quantity", headerName: "Quantity", flex: 1, cellClassName: "name-cell" },
        { field: "price", headerName: "Price", flex: 1, cellClassName: "name-cell" },
        { field: "totalprice", headerName: "Cost", flex: 1, cellClassName: "name-cell" },
        { field: "profit", headerName: "Profit", flex: 1, cellClassName: "name-cell" },
        { field: "purchasedDate", headerName: "Purchased Date", flex: 1, cellClassName: "name-cell" },

    ];

    return (
        <Box m="20px">
            <Header title="ONGOING ORDERS" subtitle="List of Ongoing Orders" />
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress sx={{
                        position: 'absolute',
                        top: "50%"
                    }} color="secondary" />
                </Box>
            ) : (
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        }
                    }}
                >
                    <Typography variant="h6">Total Profit: ${totalProfit}</Typography>
                    <Typography variant="h6">Total Income: ${totalIncome}</Typography>
                    <DataGrid
                        rows={dataWithPrice}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 80]}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Invoices;
