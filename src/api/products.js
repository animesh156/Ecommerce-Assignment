import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

// load cached data from local storage
const load = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// save data to localstorage
const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// GET ALL PRODUCTS
export const getProducts = async () => {
  try {
    const cached = load("products");
    if (cached) {
      console.log("Loaded products from localStorage");
      return cached;
    }

    console.log("Fetching products from API...");
    const res = await axios.get(`${BASE_URL}/products`);
    save("products", res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw err;
  }
};

// GET PRODUCT DETAILS (cached per ID)
export const getProduct = async (id) => {
  try {
    const cached = load(`product_${id}`);
    if (cached) {
      console.log(`Loaded product ${id} from localStorage`);
      return cached;
    }

    console.log(`Fetching product ${id} from API...`);
    const res = await axios.get(`${BASE_URL}/products/${id}`);
    save(`product_${id}`, res.data);

    return res.data;
  } catch (err) {
    console.error(`Failed to fetch product ${id}:`, err);
    throw err;
  }
};

// GET CATEGORIES
export const getCategories = async () => {
  try {
    const cached = load("categories");
    if (cached) return cached;

    const res = await axios.get(`${BASE_URL}/products/categories`);
    save("categories", res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    throw err;
  }
};

// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (cat) => {
  try {
    const products = await getProducts();
    return products.filter((p) => p.category === cat);
  } catch (err) {
    console.error("Failed to filter products by category:", err);
    throw err;
  }
};
