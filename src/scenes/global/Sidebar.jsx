import React, { useState } from "react";
import {
  Drawer,
  Box,
  Divider,
  IconButton,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import ShopIcon from '@mui/icons-material/Shop';
// import UserImage from "../assets/images/user.png";
import FlexBetween from "../../components/FlexBetween";
import { tokens } from "../../theme";
const Sidebar = ({
  isNonMobile,
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
  data,
}) => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navItem = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "User",
      icon: <PeopleOutlinedIcon />,
    },
    {
      text: "Offers",
      icon: <PeopleOutlinedIcon />,
    },
    {
      text: "Products",
      icon: <ShopIcon />,
    },
    {
      text: "Invoices-Balances",
      icon: <ReceiptOutlinedIcon />,
    },
    {
      text: "Profile-Form",
      icon: <PersonOutlinedIcon />,
    },
    {
      text: "FAQ-Page",
      icon: <HelpOutlineOutlinedIcon />,
    },
  ];
  const handleClick = (item) => {
    const lcText = item.toLowerCase();
    if (item === 'Dashboard') {
      navigate(`/`);
      setActive(lcText);
    } else {
      navigate(`/${lcText}`);
      setActive(lcText);

    }
  }
  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => {
            setIsSideBarOpen(false);
          }}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: colors.greenAccent[600],
              backgroundColor: colors.primary[400],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width={"100%"}>
            <Box m={"1.5rem 2rem 2rem 3rem"}>
              <FlexBetween color={theme.palette.secondary.main}>
                <Typography variant="h4" fontWeight={"bold"}>
                  ALI HUZAIFA
                </Typography>
                {!isNonMobile && (
                  <IconButton
                    onClick={() => {
                      setIsSideBarOpen(!isSideBarOpen);
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItem?.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleClick(text)
                      }}
                      sx={{
                        backgroundColor:
                          active == lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active == lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active == lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && <ChevronRightOutlined />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box position={'absolute'} bottom={'5px'} width={'100%'}>
            <Box m={"0.5rem 0rem"} >
              <Divider />
              <FlexBetween
                textTransform={"none"}
                gap={"1rem"}
                m="1.5rem 2rem 0 3rem"
              >
                <Box textAlign={"left"}>
                  <Typography
                    fontSize={"0.9rem"}
                    fontWeight="bold"
                    sx={{ color: theme?.palette.secondary[100] }}
                  >
                    {data?.name}
                  </Typography>
                  <Typography
                    fontSize={"0.7rem"}
                    sx={{
                      color: theme?.palette.secondary[200],
                    }}
                  >
                    {data?.occupation}
                  </Typography>
                </Box>
                <Box>
                  <SettingsOutlined />
                </Box>
              </FlexBetween>
            </Box>
          </Box>
        </Drawer>
      )
      }
    </Box >
  );
};
export default Sidebar;