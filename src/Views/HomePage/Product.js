import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProductService from "../Services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsHome,
  getProductsCart,
} from "../../Store/Slice/ProductSlice";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import { Container, Grid } from "@mui/material";
import { useEffect } from "react";

export default function Product() {
  const dispatch = useDispatch();
  const product = useSelector((data) => data.product.product);

  // const cart = useSelector((data) => data.product.addcart);
  const newProduct = useSelector((data) => data.product.newProduct);

  console.log("newproduct", newProduct);

  useEffect(() => {
    ProductService().then((productData) => {
      dispatch(getProductsHome(productData));
    });
  }, [dispatch]);

  return (
    <div>
      {/* <Tabs aria-label="disabled tabs example">
        <Tab label="Active" />
        <Tab label="Disabled" />
        <Tab label="Active" />
      </Tabs> */}
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {[...product,...newProduct].map((product, index) => {
          return (
            <Container
              key={index}
              style={{ marginTop: "50px", width: "350px", textAlign: "center" }}
            >
              <Grid
                style={{
                  margin: "16px",
                  justifyContent: "center",
                  marginRight: "16px",
                  display: "flex",
                }}
              >
                <Card
                  style={{
                    width: "250px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={product.image}
                    style={{
                      height: "200px",
                      width: "300px",
                      objectFit: "contain",
                    }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.primary">
                      {product.title}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {/* <IconButton >
                    <FavoriteIcon />
                  </IconButton> */}

                    <Button
                      variant="contained"
                      onClick={() => dispatch(getProductsCart(product))}
                    >
                      Add {`$ ${product.price}`} <ShoppingCartIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Container>
          );
        })}
      </div>

     
    </div>
  );
}
