import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    addToCart: (state, action) => {
      const {item} = action.payload;
      const existingItem = state.cart.find((i)=> i._id === item._id);
      if (existingItem) {
        existingItem.count += item.count;
      }
      else{
        state.cart = [...state.cart, action.payload.item];
      }
      localStorage.setItem("cart",JSON.stringify(state.cart))
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
      localStorage.setItem("cart",JSON.stringify(state.cart))

    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id) {
          item.count++;
        }
        return item;
      });
      localStorage.setItem("cart",JSON.stringify(state.cart))

    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id && item.count > 1) {
          item.count--;
        }
        return item;
      });
      localStorage.setItem("cart",JSON.stringify(state.cart))

    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export default cartSlice.reducer;
export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;
