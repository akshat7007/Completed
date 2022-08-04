import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import Product from "../HomePage/Product";
import HomeIcon from "@mui/icons-material/Home";

export default function CartPageNav() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/homepage");
  };

  return (
    <div>
      <Box
        style={{ position: "sticky", top: "0", zIndex: 1 }}
        sx={{ flexGrow: 1 }}
      >
        <AppBar position="static">
          <Toolbar>
            <HomeIcon
              onClick={navigateHome}
              style={{
                cursor: "pointer",
                marginRight: "5px",
                alignItems: "center",
              }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cart
            </Typography>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
              }}
              color="inherit"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          paddingInlineStart: "8px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      ></div>
    </div>
  );
}
