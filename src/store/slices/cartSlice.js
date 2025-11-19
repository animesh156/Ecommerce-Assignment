import { createSlice } from "@reduxjs/toolkit";

const initial = {
  items: {},
  totalCount: 0,
  totalPrice: 0,
};

const calc = (items) => {
  let count = 0;
  let price = 0;
  Object.values(items).forEach(({ product, qty }) => {
    count += qty;
    price += product.price * qty;
  });
  return { count, price };
};

const cart = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    addItem: (state, { payload }) => {
      const { product, qty } = payload;

      if (state.items[product.id]) {
        state.items[product.id].qty += qty;
      } else {
        state.items[product.id] = { product, qty };
      }

      const t = calc(state.items);
      state.totalCount = t.count;
      state.totalPrice = t.price;
    },

    updateQty: (state, { payload }) => {
      const { id, qty } = payload;
      state.items[id].qty = qty;

      const t = calc(state.items);
      state.totalCount = t.count;
      state.totalPrice = t.price;
    },

    removeItem: (state, { payload }) => {
      delete state.items[payload];

      const t = calc(state.items);
      state.totalCount = t.count;
      state.totalPrice = t.price;
    },

    clearCart: (state) => {
      state.items = {};
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, updateQty, removeItem, clearCart } = cart.actions;
export default cart.reducer;
