import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeItem } from "../store/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  const items = Object.values(useSelector((s) => s.cart.items));
  const total = useSelector((s) => s.cart.totalPrice);
  const dispatch = useDispatch();
  const nav = useNavigate();

  if (items.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link
          to="/"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          Continue Shopping →
        </Link>
      </div>
    );

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* LEFT SIDE — CART ITEMS */}
      <div className="md:col-span-2 space-y-4">
        {items.map(({ product, qty }) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
          >
            <div className="flex gap-4">
              {/* IMAGE */}
              <img
                src={product.image}
                className="w-24 h-24 object-contain bg-gray-50 rounded-lg p-2"
              />

              {/* PRODUCT DETAILS */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-600">${product.price}</p>

                {/* Quantity Selector */}
                <div className="mt-3 flex items-center gap-3">
                  <label className="text-sm text-gray-600">Qty:</label>

                  <select
                    value={qty}
                    onChange={(e) =>
                      dispatch(updateQty({ id: product.id, qty: +e.target.value }))
                    }
                    className="border p-2 rounded-lg text-sm cursor-pointer hover:border-gray-500"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i}>{i + 1}</option>
                    ))}
                  </select>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => dispatch(removeItem(product.id))}
                    className="flex items-center gap-1 text-red-600 cursor-pointer hover:text-red-800 ml-4 transition"
                  >
                    <FaTrash size={14} />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </div>

              {/* SUBTOTAL */}
              <div className="font-bold text-lg text-right min-w-[80px]">
                ${formatPrice(product.price * qty)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE — SUMMARY */}
      <aside className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between text-lg font-medium mb-4">
          <span>Total:</span>
          <span>${formatPrice(total)}</span>
        </div>

        <button
          onClick={() => nav("/checkout")}
          className="bg-green-600 text-white w-full py-3 rounded-xl shadow hover:bg-green-700 transition cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </aside>
    </div>
  );
}
