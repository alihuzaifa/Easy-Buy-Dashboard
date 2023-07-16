import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { getApiMethod } from "../../Api";

const User = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userList, setUserList] = useState([])

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "_id",
            headerName: "User Id",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "accessLevel",
            headerName: "Access Level",
            flex: 1,
            renderCell: () => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                    >
                        
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            User
                        </Typography>
                    </Box>
                );
            },
        },
    ];
    const getUsers = async () => {
        const userList = await getApiMethod('user/allUser')
        if (userList?.data?.success) {
            const addIndex = userList?.data?.data?.map((obj, i) => {
                return { ...obj, id: i }
            })
            setUserList(addIndex)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Box m="20px">
            <Header title="USER" subtitle="All app user list" />
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
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
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
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid rows={userList} columns={columns} />
            </Box>
        </Box>
    );
};

export default User;
