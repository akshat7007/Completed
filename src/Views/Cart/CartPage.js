import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteCartItem,
  addCartItemQuantity,
  removeCartItemQuantity,
} from "../../Store/Slice/ProductSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CartPageNav from "./CartPageNav";

function CartPage() {
  const cart = useSelector((cv) => cv.product.addcart);
  // const totalItem = useSelector((cv)=>cv.product.cartTotal)

  const dispatch = useDispatch();

  const getTotal = () => {
    let totalAmount = 0;
    for (let x = 0; x < cart.length; x++) {
      totalAmount = totalAmount + cart[x].price * cart[x].itemQuantity;
    }
    return totalAmount;
  };

  return (
    <>
      <div>
        <CartPageNav />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "10px",
          }}
        >
          TOTAL AMOUNT: {getTotal().toFixed(2)}
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {cart.map((cart, index) => {
            return (
              <Container
                key={index}
                style={{
                  marginTop: "50px",
                  width: "350px",
                  textAlign: "center",
                }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ display: "flex", flexDirection: "column" }}>
                    <CardMedia
                      component="img"
                      image={cart.image}
                      alt="random"
                      style={{
                        height: "200px",
                        width: "300px",
                        objectFit: "contain",
                      }}
                    />

                    <CardContent
                      sx={{ flexGrow: 1 }}
                      style={{ height: "100px" }}
                    >
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="h2"
                        style={{ marginTop: "25px" }}
                      >
                        {cart.title}
                      </Typography>
                    </CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div>
                        <AddIcon
                          onClick={() => dispatch(addCartItemQuantity(cart))}
                        />
                      </div>
                      <div> {cart.itemQuantity}</div>
                      <div>
                        <RemoveIcon
                          onClick={() => dispatch(removeCartItemQuantity(cart))}
                        />
                      </div>
                    </div>
                    <CardActions
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button variant="contained" style={{ margin: "4px" }}>
                        Checkout
                      </Button>
                      <div style={{ fontWeight: "bold" }}>
                        {" "}
                        Price: {`$ ${cart.price}`}
                        {/* {getTotal().toFixed(2)} */}
                      </div>
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(deleteCartItem(index));
                        }}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              </Container>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CartPage;
