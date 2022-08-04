import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "user",
  initialState: {
    product: [],
    addcart: [],
    newProduct: [],
    category: [],
  },
  reducers: {
    getProductsHome(state, action) {
      return { ...state, category: action.payload, product: action.payload };
    },

    getProductsCart(state, action) {
      let addcarts = state.addcart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (addcarts === -1) {
        state.addcart.push({ ...action.payload, itemQuantity: 1 });
      } else {
        state.addcart[addcarts].itemQuantity =
          state.addcart[addcarts].itemQuantity + 1;
      }
    },

    deleteCartItem(state, action) {
      const deleteItem = state.addcart.filter((cv, id) => {
        return id !== action.payload;
      });
      return { ...state, addcart: deleteItem };
    },

    addCartItemQuantity(state, action) {
      let addcarts = state.addcart.findIndex(
        (item) => item.id === action.payload.id
      );
      state.addcart[addcarts].itemQuantity =
        state.addcart[addcarts].itemQuantity + 1;
    },
    removeCartItemQuantity(state, action) {
      let addcarts = state.addcart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.addcart[addcarts].itemQuantity > 0) {
        state.addcart[addcarts].itemQuantity =
          state.addcart[addcarts].itemQuantity - 1;
      }
    },
    addNewProduct(state, action) {
      console.log(action.payload);
      state.newProduct.push(action.payload);
    },
    filterCategory(state, action) {
      let abc = state.category.filter(
        (data) => data.category === action.payload
      );
      state.product = abc;
      if ("all" === action.payload) {
        state.product = state.category;
      }
    },
   highSort(state, action) {
      const descending = state.product.sort((a, b) => {
        return b.price - a.price;
      });
      state.product = descending;
    },
    lowSort(state, action) {
     
      const ascending = state.product.sort((a, b) => {
        return a.price - b.price;
      });
      state.product = ascending;
    },
    

  },
});

export const {
  getProductsHome,
  getProductsCart,
  deleteCartItem,
  removeTotalAmount,
  addCartItemQuantity,
  removeCartItemQuantity,
  addNewProduct,
  filterCategory,
  highSort,lowSort
} = ProductSlice.actions;

export default ProductSlice.reducer;










   



// sortPrice(state, action) {
//   const sort = state.category.filter((data) => { return (data.price > action.payload[0]  &&  data.price < action.payload[1]) })
//   state.product =sort
// }


// let abc = state.category.sort(function (a, b)(
//   return b.price - a.price
// ))
// state.product =abc
