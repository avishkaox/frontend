import Header from "../../components/Header";
import { Box, Card, CardContent, CardMedia, Grid, Typography, Pagination, Button, CircularProgress } from "@mui/material";
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import React, { useEffect, useState } from 'react';
import { tokens } from "../../theme";
import { useMode } from "../../theme";
import { getAllProducts, getAllCategories } from "../../auth/authService.js";

const Products = () => {
    // Using the useMode hook to get the theme and color mode
    const [theme] = useMode(); // Ensure the hook is returning the theme properly
    const colors = tokens(theme.palette.mode);

    // State to hold the all products data
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Get all product data from localStorage or fetch from backend API
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

    // Fetch all product Categories from the backend API
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const fetchAllCategories = async () => {
        try {
            const categories = await getAllCategories();
            setAllCategories(categories);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const cardsPerPage = 12; // Number of cards to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleShowAll = () => {
        setSelectedCategory(null);
    };

    // Filter products based on the selected category
    const filteredProducts = selectedCategory
        ? allProducts.filter((product) => product.category.name === selectedCategory.name)
        : allProducts;

    const totalCards = filteredProducts.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    return (
        <Box m="20px">
            <Header title="FOOD ITEMS" subtitle="View all Food Items" />
            <Box className="categories" display="block" my={2}>
                <Button
                    onClick={handleShowAll}
                    sx={{ margin: 1 }}
                >
                    Show All
                </Button>
                {allCategories.map((category) => (
                    <Button
                        key={category.id}
                        onClick={() => handleCategorySelect(category)}
                        sx={{ margin: 1 }}
                    >
                        {category.name}
                    </Button>
                ))}
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress sx={{
                        position: 'absolute',
                        top: "50%"
                    }} color="secondary" />
                </Box>
            ) : (
                <Box className="cardgrid" >
                    <Grid container spacing={2}>
                        {filteredProducts.slice(startIndex, endIndex).map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={3}>
                                <Card sx={{ backgroundColor: colors.greenAccent[600] }} >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image?.filePath}
                                        alt="Card Image"
                                    />
                                    <CardContent>
                                        <Box display="flex" flexDirection="row"
                                            alignItems="center"
                                            justifyContent="space-between" paddingBottom="19px"  >
                                            <Typography variant="h3">
                                                {product.name}
                                            </Typography>
                                            <Box display="flex" flexDirection="row"
                                                alignItems="stretch">
                                                <Typography variant="h5">
                                                    :{product.price}Rs
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" >
                                            <Box display="flex" flexDirection="row"
                                                alignItems="stretch">
                                                <AccessTimeFilledOutlinedIcon />
                                                <Typography variant="h5">
                                                    : {product.waitingtime}Minutes
                                                </Typography>
                                            </Box>
                                            <Button variant="contained" sx={{ color: "white", fontSize: "15px" }} color="success">
                                                ORDER
                                            </Button>
                                        </Box>
                                        <Box className="collectlocation">
                                            Collect Location : {product.collectlocation}
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
    );
};

export default Products;
