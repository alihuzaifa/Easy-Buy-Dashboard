import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    return (
        <Box
            display={isNonMobile ? "flex" : "block"}
            width={"100%"}
            height={"100%"}

        >
            <Sidebar
                data={{}}
                isNonMobile={isNonMobile}
                drawerWidth={"250px"}
                isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSideBarOpen}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    marginBottom: "20px"
                }}
            >
                <Topbar isSideBarOpen={isSideBarOpen}
                    setIsSideBarOpen={setIsSideBarOpen} />
                <Outlet />
            </Box>
        </Box>
    );
};
export default Layout;