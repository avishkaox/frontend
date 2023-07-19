import Header from "../../components/Header";
import { Box, Card, CardContent, CardMedia, Grid, Typography, Pagination, Button, useTheme, CircularProgress } from "@mui/material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import React, { useEffect, useState } from 'react';
import { tokens } from "../../theme";
import { getAllProducts } from "../../auth/authService.js";

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State to hold the allproducts data
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    // Get all user data from localStorage or fetch from backend API
    useEffect(() => {
        setLoading(true);
        fetchData();
        
    }, []);

    // Fetch all product data from the backend API
    const fetchData = async () => {
        try {
            const products = await getAllProducts();
            setAllProducts(products);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const cardsPerPage = 12; // Number of cards to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const totalCards = allProducts.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const visibleCards = allProducts.slice(startIndex, startIndex + cardsPerPage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <Box m="20px">
            <Header title="PRODUCTS" subtitle="View all Products" />
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress sx={{
                        position: 'absolute',
                        top: "50%"
                    }} color="secondary" />
                </Box>
            ) : (
                <Box className ="cardgrid" >
                    <Grid container spacing={2}>
                        {visibleCards.map((allProducts) => (
                            <Grid item key={allProducts.id} xs={12} sm={6} md={3}>
                                <Card sx={{ backgroundColor: colors.greenAccent[600] }} >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={allProducts.image?.filePath}
                                        alt="Card Image"
                                    />
                                    <CardContent>
                                        <Box display="flex" flexDirection="row"
                                            alignItems="center"
                                            justifyContent="space-between" paddingBottom="19px"  >
                                            <Typography variant="h3">
                                                {allProducts.name}
                                            </Typography>
                                            <Box display="flex" flexDirection="row"
                                                alignItems="stretch">
                                                <AttachMoneyOutlinedIcon />
                                                <Typography variant="h5">
                                                    :{allProducts.price}Rs
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" >
                                            <Box display="flex" flexDirection="row"
                                                alignItems="stretch">
                                                <AccessTimeFilledOutlinedIcon />
                                                <Typography variant="h5">
                                                    : {allProducts.waitingtime}Minutes
                                                </Typography>
                                            </Box>
                                            <Button variant="contained" sx={{ color: "white", fontSize: "15px" }} color="success">
                                                ORDER
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Pagination
                        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Box>
            )}

        </Box>
    )
}

export default Products;
