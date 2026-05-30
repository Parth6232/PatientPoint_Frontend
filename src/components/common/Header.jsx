import { AppBar, Avatar, Toolbar } from "@mui/material";
import Box from "./Box";
import logo from "../../assets/logo.svg";

const Header = ({ drawerWidth }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        ml: { sm: `${drawerWidth}px` },
        background: "linear-gradient(174.8deg, #000000 49.15%, #1D1D1D 119.89%)",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Box>
            <img src={logo} alt="Logo" style={{ height: 40, width: "auto" }} />
          </Box>
          <Box>
            <Avatar sx={{ cursor: "pointer" }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
