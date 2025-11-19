import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../api/products";
import { addItem } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    getProduct(id).then(setP);
  }, [id]);

  if (!p) return <p>Loading...</p>;

  const add = () => {
    dispatch(addItem({ product: p, qty }));
    nav("/cart");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={p.image} className="h-96 object-contain" />

      <div>
        <h1 className="text-2xl font-bold">{p.title}</h1>
        <p className="mt-2 text-xl font-semibold">${p.price}</p>
        <p className="mt-4">{p.description}</p>

        <div className="flex items-center gap-4 mt-6">
          <select
            className="border p-2"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>

          <button
            onClick={add}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
