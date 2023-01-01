import { useQuery } from "@apollo/client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { mainListItems } from "../Components/Dashboard/listItems";
import MY_SHOPS from "../graphql/queries/myShops";
import { ShopContext, ShopType } from "../utiles/ShopContext";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface Props {
  children?: React.ReactNode;
}
const mdTheme = createTheme();

export default function HomeLayout({ children }: Props) {
  const [open, setOpen] = React.useState(true);
  const { loading, error, data } = useQuery(MY_SHOPS, {
    variables: { limit: 10 },
  });
  const [shop, setShop] = useState<ShopType | null>(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  var myShops: ShopType[] = data.myShops;
  console.log(myShops[0]);
  if (!shop && myShops[0]) {
    setShop(myShops[0]);
  }

  console.log("shop", shop);

  const handleChangeShop = (
    event: SelectChangeEvent<number>,
    child: React.ReactNode
  ) => {
    console.log("here:");
    console.log(myShops.find((shop) => shop.id === event.target.value));
    setShop(myShops.find((shop) => shop.id === event.target.value) ?? null);
  };

  console.log("id:", shop?.id);

  return (
    <ThemeProvider theme={mdTheme}>
      <ShopContext.Provider value={{ shop, setShop }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <FormControl sx={{ width: 300 }}>
                <Select
                  labelId="demo-simple-select-label"
                  renderValue={(value) =>
                    value ? (
                      <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                      >
                        {myShops.find((_shop) => _shop.id === value)?.name}
                      </Typography>
                    ) : (
                      <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                      >
                        Select a shop
                      </Typography>
                    )
                  }
                  id="shop-select"
                  value={shop?.id}
                  onChange={handleChangeShop}
                >
                  {myShops.map((_shop) => (
                    <MenuItem key={_shop.id} value={_shop?.id}>
                      {_shop?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {children}
            </Container>
          </Box>
        </Box>
      </ShopContext.Provider>
    </ThemeProvider>
  );
}
