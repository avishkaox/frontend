import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { tokens } from "../../theme";



const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-cell" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "cost", headerName: "Cost", flex: 1, renderCell: (params) => (
                <Typography colors={colors.greenAccent[500]} >
                    ${params.row.cost}
                </Typography>
            )
        },
        { field: "date", headerName: "Date", flex: 1 },

    ];

    return (
        <Box m="20px" >
            <Header title="INVOICES" subtitle="LIST of Invoices" />
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
                        "& .MuiButtonBase-root .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        }
                    }
                }
            >
                <DataGrid
                    rows={mockDataInvoices}
                    columns={columns}
                    checkboxSelection={true}
                />

            </Box>
        </Box>
    )

};

export default Invoices;
