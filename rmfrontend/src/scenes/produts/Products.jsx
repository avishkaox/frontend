import Header from "../../components/Header";
import { Box, useTheme, Card, CardContent, CardMedia, Grid, Typography, Pagination } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { tokens } from "../../theme";
import { getAllProducts } from "../../auth/authService.js";

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State to hold the allproducts data
    const [allProducts, setAllProducts] = useState([]);

    // Get all user data from localStorage or fetch from backend API
    useEffect(() => {
        const allProductsData = JSON.parse(localStorage.getItem('allProductsData'));
        if (allProductsData) {
            setAllProducts(allProductsData);
        } else {
            fetchData();
        }
    }, []);

    // Fetch all product data from the backend API
    const fetchData = async () => {
        try {
            const products = await getAllProducts();
            setAllProducts(products);
            // Save the data in localStorage
            localStorage.setItem('allProductsData', JSON.stringify(products));
        } catch (error) {
            // Handle the error
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
            <Box>
                <Grid container spacing={2}>
                    {visibleCards.map((allProducts) => (
                        <Grid item key={allProducts.id} xs={12} sm={6} md={3}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={allProducts.image?.filePath} // Use card.image.filePath instead of allProducts.image.filePath
                                    alt="Card Image"
                                />
                                <CardContent>
                                    <Typography variant="h5">
                                        {allProducts.name} {/* Use card.name instead of allProducts.name */}
                                    </Typography>
                                    <Typography variant="h3">
                                        {allProducts.price} {/* Use card.price instead of allProducts.price */}
                                    </Typography>
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
        </Box>
    )
}

export default Products;
