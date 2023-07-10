import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { tokens } from "../../theme";



const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-cell" },
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left", cellClassName: "age-cell" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "access",
            headerName: "Access Level",
            flex: 1,
            cellClassName: "access-cell",
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0px auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            access === 'admin'
                                ? colors.greenAccent[600]
                                : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
                        {access === 'manager' && <SecurityOutlinedIcon />}
                        {access === 'user' && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }} >
                            {access}
                        </Typography>
                    </Box>
                )

            }
        },

    ];

    return (
        <Box m="20px" >
            <Header title="TEAM" subtitle="Managing the team Members" />
            <Box
            m="40px 0 0 0"
            height="75vh"
            sx={
                {
                   "& .MuiDataGrid-root": {
                    border:"none",
                   },
                   "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                   },
                   "& .name-cell": {
                    color : colors.greenAccent[300],
                   },
                   "& .MuiDataGrid-columnHeader": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom:"none",
                   },
                   "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                   },
                   "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700], 
                   },
                   "& .MuiDataGrid-panelFooter button":{
                    // color : colors.grey[100],
                    color:"white !!important",
                   }
                }
            }
            >
                <DataGrid
                    rows={mockDataTeam}
                    columns={columns}
                    
                />

            </Box>
        </Box>
    )

};

export default Team;
