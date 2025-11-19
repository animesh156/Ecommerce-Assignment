import { createSlice } from "@reduxjs/toolkit";

/**
 * Cart state shape:
 * items: {
 *    [productId]: { product: {...}, qty: number }
 * }
 * totalCount: total number of items (sum of quantities)
 * totalPrice: combined price of all cart items
 */
const initial = {
  items: {},
  totalCount: 0,
  totalPrice: 0,
};

/**
 * Utility function to recalculate:
 * - total item count
 * - total order price
 *
 * This ensures every reducer stays clean.
 */
const calc = (items) => {
  let count = 0;
  let price = 0;

  Object.values(items).forEach(({ product, qty }) => {
    count += qty;                   // total qty of all items
    price += product.price * qty;   // subtotal for each item
  });

  return { count, price };
};

/**
 * Redux Toolkit Slice for Cart Management
 */
const cart = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    /**
     * Add an item to cart.
     * If item already exists, increase its quantity.
     */
    addItem: (state, { payload }) => {
      const { product, qty } = payload;

      // If product already in cart, increase quantity
      if (state.items[product.id]) {
        state.items[product.id].qty += qty;
      } else {
        // Otherwise create a new cart entry
        state.items[product.id] = { product, qty };
      }

      // Recalculate totals
      const t = calc(state.items);
      state.totalCount = t.count;
      state.totalPrice = t.price;
    },

    /**
     * Update quantity of a specific cart item.
     * Payload: { id, qty }
     */
    updateQty: (state, { payload }) => {
      const { id, qty } = payload;

      // Update only the quantity, product does not change
      state.items[id].qty = qty;

      // Recalculate totals
      const t = calc(state.items);
      state.totalCount = t.count;
      state.totalPrice = t.price;
    },

    /**
     * Remove an item from cart completely.
     */
    removeItem: (state, { payload: id }) => {
      delete state.items[id];

      // Recalculate totals
      const t = calc(state.items);
      state.totalCount = t.count;
      state.totalPrice = t.price;
    },

    /**
     * Clear entire cart.
     * Used after checkout or manual reset.
     */
    clearCart: (state) => {
      state.items = {};
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, updateQty, removeItem, clearCart } = cart.actions;
export default cart.reducer;
