import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Divider, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../Store/Slice/ProductSlice";

function AddProductPage() {
  let [input, setInput] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(false);
  const [price, setPrice] = useState(false);
  const [image, setImage] = useState(false);
  const [category, setCategory] = useState(false);

  let label = <p>Input field is required</p>;

  const inputHandler = (e) => {
    // const { value, name } = e.target;
    const name = e.target.name;
    const value = e.target.value;
    setInput((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const formValidation = () => {
    let isValid = true;

    if (input.title === "") {
      setTitle(true);
      isValid = false;
    } else if (input.price === "") {
      setPrice(true);
      isValid = false;
    } else if (input.image === "") {
      setImage(true);
      isValid = false;
    } else if (input.category === "") {
      setCategory(true);
      isValid = false;
    }
    return isValid;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formValidation()) {
      console.log(input.title, input.price, input.image);
      const addProduct = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      };
      fetch("https://fakestoreapi.com/products", addProduct)
        .then((response) => response.json())
        .then((data) => pushData(data));

      const pushData = (data) => {
        const productPrice = { ...data, price: Number(data.price) };
        if (productPrice) {
          dispatch(addNewProduct(productPrice));
          console.log(productPrice);

          navigate("/homepage");
        }
      };
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}
    >
      <Paper
        elevation={3}
        style={{
          display: "flex",
          height: "400px",
          width: "500px",
          flexDirection: "column",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Typography style={{}} component="h1" variant="h5">
            Add New Product
          </Typography>
          <Divider />
        </div>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            name="title"
            required
            fullWidth
            id="outlined-basic"
            label="Product Title"
            variant="outlined"
            onChange={inputHandler}
            type="text"
            autoComplete="off"
            value={input.title}
          // autoFocus
          />
          {title ? <span style={{ color: "red" }}> {label}</span> : null}

          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="Price"
            name="price"
            type="number"
            onChange={inputHandler}
            value={input.price}
            autoComplete="off"
          />
          {price ? <span style={{ color: "red" }}>{label}</span> : null}
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            variant="outlined"
            onChange={inputHandler}
            label="Image URL"
            name="image"
            value={input.image}
          />
          {image ? <span style={{ color: "red" }}>{label} </span> : null}

          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            variant="outlined"
            onChange={inputHandler}
            label="Add Category"
            name="category"
            value={input.category}
          /> */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="outlined-basic"
              value={input.category}
              name="category"
              label="Select Category"
              onChange={inputHandler}
            >
              <MenuItem value={input.category}>men,s clothing</MenuItem>
              <MenuItem value={input}>Twenty</MenuItem>
              <MenuItem value={input}>Thirty</MenuItem>
            </Select>
          </FormControl>
          {category ? <span style={{ color: "red" }}>{label} </span> : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default AddProductPage;
