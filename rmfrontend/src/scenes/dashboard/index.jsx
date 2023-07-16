import Header from "../../components/Header"
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
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
import { useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice.js";


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = useSelector(selectUser);

    return (
        <Box p={2}>
            <Box display="flex" justifyContent="space-between" p={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center"  >
                    <Header title="DASHBOARD" subtitle={ "Welcome " + user.name + " to Your Dashboard"}  />
                </Box>
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
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
                    {mockTransactions.map((transaction, i) => (
                        <Box
                            key={`${transaction.txId}-${i}`}
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
                                    {transaction.txId}
                                </Typography>
                                <Typography color={colors.grey[100]}
                                >
                                    {transaction.user}
                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]} >{transaction.date}</Box>
                            <Box
                                backgroundColor={colors.greenAccent[500]}
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                {transaction.cost}
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
                        Campaign
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
                        Sales Quantity
                    </Typography>
                    <Box height="250px"  >
                        <BarChart isDashboard = {true} />
                    </Box>
                </Box>



            </Box>


        </Box>
    )
}

export default Dashboard