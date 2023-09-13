import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addtoCart: (state, action) => {
      const existingItem = state?.cart?.find(
        (item) => item?.id === action?.payload?.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...action?.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const items = state?.cart?.filter(
        (item) => item?.id !== action?.payload?.id
      );
      state.cart = items;
    },
    incrementQty: (state, action) => {
      const product = state?.cart?.filter(
        (item) => item?.id === action?.payload?.id
      );

      if (product) {
        product.quantity++;
      }
    },
    decrementQty: (state, action) => {
      const product = state?.cart?.filter(
        (item) => item?.id === action?.payload?.id
      );

      if (product?.quantity === 1) {
        product?.quantity == 0;
        const items = state?.cart?.filter(
          (item) => item?.id !== action?.payload?.id
        );
        state.cart = items;
      } else {
        product.quantity--;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addtoCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
