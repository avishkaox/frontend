import Header from "../../components/Header"
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import React, { useEffect, useState } from 'react';
import { getAllPurchasedProducts, getAllItems } from "../../auth/authService.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice.js";


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = useSelector(selectUser);


    const [allpurchasedproducts, setAllPurchasedProducts] = useState([]);
    const [allItems, setAllItem] = useState([]);

    useEffect(() => {
        Promise.all([getAllPurchasedProducts(), getAllItems()])
            .then(([purchasedproducts, items]) => {
                setAllPurchasedProducts(purchasedproducts);
                setAllItem(items);
            })
            .catch((error) => {
                // Handle the error
            })
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
            price:item.productId.price * item.quantity,
            totalprice: totalPrice,
        };
    });




    return (
        <Box p={2}>
            <Box display="flex" justifyContent="space-between" p={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center"  >
                    <Header title="DASHBOARD" subtitle={"Welcome " + user.name + " to Your Dashboard"} />
                </Box>
                <Box>
                </Box>
            </Box>
            {/* Grid and Charts  */}

            <Box
                display="grid"
                gridTemplateColumns=" repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW1 */}
                <Box gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <StatBox
                        title="12,361"
                        subtitle="Emails Sent"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>


                <Box gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <StatBox
                        title="431,225"
                        subtitle="Sales Obtained"
                        progress="0.5"
                        increase="+21%"
                        icon={
                            <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>
                <Box gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <StatBox
                        title="32,441"
                        subtitle="New Clients"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>

                <Box gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <StatBox
                        title="1,325,134"
                        subtitle="Traffic Inbount"
                        progress="0.80"
                        increase="+45%"
                        icon={
                            <TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>

                {/* Row 2  */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography variant="h5" fontWeight="600" color={colors.grey[100]} >
                                Revenue Generated
                            </Typography>
                            <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]} >
                                $49,5656
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>

                    </Box>

                    <Box height="250px" ml="-20px" >
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>

                {/* Transactions  */}
                <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto" >
                    <Box display="flex" justifyContent="space-between" alignItems="center"
                        borderBottom={`4px slid ${colors.primary[500]}`}
                        color={colors.grey[100]}
                        p="15px"
                    >
                        <Typography color={colors.grey[100]}
                            variant="h5"
                            fontWeight="600"
                        >
                            Recent Transactions
                        </Typography>
                    </Box>
                    {dataWithPrice.map((data, i) => (
                        <Box
                            key={`${data.id}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px slid ${colors.primary[500]}`}
                            color={colors.grey[100]}
                            p="15px"
                        >
                            <Box>
                                <Typography color={colors.greenAccent[500]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    {data.name}
                                </Typography>
                                <Typography color={colors.grey[100]}
                                >
                                    {data.quantity}
                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]} >{data.purchasedDate}</Box>
                            <Box
                                backgroundColor={colors.greenAccent[500]}
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                {data.price}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* row 3 */}

                <Box
                    gridColumn='span 4'
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600" >
                        Food Items by Category
                    </Typography>
                    <Box height="250px"  >
                        <PieChart />
                    </Box>
                </Box>


                <Box
                    gridColumn='span 8'
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600" >
                        Stock Balance 
                    </Typography>
                    <Box height="250px"  >
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>



            </Box>


        </Box>
    )
}

export default Dashboard