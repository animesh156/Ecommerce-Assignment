import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../api/products";
import { addItem } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { FaStar, FaStarHalfAlt, FaRegStar, FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    getProduct(id).then(setP).catch(console.error);
  }, [id]);

  if (!p)
    return (
     <Loader />
    );

  const add = () => {
    toast.success("Item added to cart")
    dispatch(addItem({ product: p, qty }));
    nav("/cart");
  };

  // ---------------- RATING UI ----------------
  const renderStars = () => {
    const rating = p.rating?.rate || 0;
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1 text-yellow-500 mt-2">
        {[...Array(full)].map((_, i) => (
          <FaStar key={i} />
        ))}
        {half && <FaStarHalfAlt />}
        {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
          <FaRegStar key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 py-8">
      {/* LEFT SIDE – IMAGE */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center border border-gray-100">
        <img src={p.image} alt={p.title} className="h-96 object-contain" />
      </div>

      {/* RIGHT SIDE – PRODUCT DETAILS */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h1 className="text-3xl font-bold">{p.title}</h1>

        {/* PRICE */}
        <p className="text-2xl text-green-600 font-semibold mt-2">${p.price}</p>

        {/* RATING */}
        {renderStars()}
        <p className="text-gray-500 text-sm">
          ({p.rating?.count || 0} reviews)
        </p>

        {/* DESCRIPTION */}
        <p className="mt-5 text-gray-700 leading-relaxed">{p.description}</p>

        {/* QUANTITY + ADD BUTTON */}
        <div className="flex items-center gap-4 mt-8">
          {/* Qty Selector */}
          <div>
            {/* <label className="text-sm text-gray-600 block mb-1">Quantity</label> */}
            <select
              className="border p-2 rounded-lg cursor-pointer"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Add To Cart Button */}
          <button
            onClick={add}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
          >
            <FaCartPlus />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
