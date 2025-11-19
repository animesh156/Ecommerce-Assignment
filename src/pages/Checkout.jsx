import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { FaCheckCircle } from "react-icons/fa";

export default function Checkout() {
  const items = Object.values(useSelector((s) => s.cart.items));
  const total = useSelector((s) => s.cart.totalPrice);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // ------------------ FORM VALIDATION ------------------
  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Address is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ------------------ PLACE ORDER ------------------
  const submit = () => {
    if (!validate()) return;

    dispatch(clearCart());
    setSuccess(true);
  };

  // ------------------ SUCCESS MESSAGE ------------------
  if (success)
    return (
      <div className="p-10 bg-white shadow rounded-xl text-center max-w-xl mx-auto mt-10">
        <FaCheckCircle size={50} className="text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your items will be shipped soon.
        </p>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer"
          onClick={() => nav("/")}
        >
          Back to Home
        </button>
      </div>
    );

  // MAIN CHECKOUT UI
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      {/* LEFT: SHIPPING FORM */}
      <form className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Name</label>
          <input
            className={`border p-3 w-full rounded-lg mt-1 ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="John Doe"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            className={`border  p-3 w-full rounded-lg mt-1 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="john@example.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Address</label>
          <textarea
            className={`border p-3 w-full rounded-lg mt-1 h-24 resize-none ${
              errors.address ? "border-red-500" : ""
            }`}
            placeholder="123 Main Street, City"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          {errors.address && (
            <p className="text-red-600 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <button
          type="button"
          onClick={submit}
          className="bg-blue-600 text-white w-full py-3 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
        >
          Place Order
        </button>
      </form>

      {/* RIGHT: ORDER SUMMARY */}
      <aside className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="space-y-3">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex justify-between items-center">
              <span className="text-gray-700">
                {product.title} × {qty}
              </span>
              <span className="font-semibold">
                ${formatPrice(product.price * qty)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t mt-5 pt-4 flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${formatPrice(total)}</span>
        </div>
      </aside>
    </div>
  );
}
