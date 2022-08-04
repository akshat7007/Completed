import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Product from "../HomePage/Product";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { indigo } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
// import Tabs from "@mui/material/Tabs";
import { useDispatch } from "react-redux";
import {
  filterCategory,
  highSort,
  lowSort,
} from "../../Store/Slice/ProductSlice";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateCart = () => {
    navigate("/cart");
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const cart = useSelector((data) => data.product.addcart);

  return (
    <div style={{}}>
      <Box
        style={{ position: "sticky", top: "0", zIndex: 1 }}
        sx={{ flexGrow: 1 }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>

            <Link to={"/addproduct"}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                style={{ marginRight: "10px" }}
              >
                Add Product
              </Button>
            </Link>

            <Badge
              badgeContent={cart.length}
              sx={{
                color: indigo[900],
              }}
            >
              <ShoppingCartIcon
                style={{
                  cursor: "pointer",
                  color: "white",
                  marginRight: "10px",
                }}
                onClick={navigateCart}
              />
            </Badge>
            <Button onClick={logoutHandler} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <div>
          <Button
            onClick={() => {
              dispatch(filterCategory("all"));
            }}
          >
            All
          </Button>
          <Button
            onClick={() => {
              dispatch(filterCategory("men's clothing"));
            }}
            label="Men"
          >
            Men
          </Button>
          <Button
            onClick={() => {
              dispatch(filterCategory("women's clothing"));
            }}
            label="Women"
          >
            Women
          </Button>

          <Button
            onClick={() => {
              dispatch(filterCategory("jewelery"));
            }}
            label="Jewelery"
          >
            Jewelery
          </Button>

          <Button
            onClick={() => {
              dispatch(filterCategory("electronics"));
            }}
            label="Electronics"
          >
            Electronics
          </Button>
        </div>
        <span style={{ display: "flex" }}>
          Sort By Price :
          <Button
            onClick={() => {
              dispatch(lowSort());
            }}
          >
            Low To High
            <ArrowCircleUpRoundedIcon />
          </Button>
          <Button
            onClick={() => {
              dispatch(highSort());
            }}
          >
            High To Low
            <ArrowCircleDownRoundedIcon />
          </Button>
        </span>
      </div>
      <div
        style={{
          paddingInlineStart: "8px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Product />
      </div>
    </div>
  );
}
