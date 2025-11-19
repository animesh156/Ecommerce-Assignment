# MiniShop – Mini E-Commerce React App

A functional, fully responsive mini e-commerce web application built using **React**, **Redux Toolkit**, **React Router**, and **Tailwind CSS**, powered by the **Fake Store API**.

---

## 🚀 Features

- **Product Listing** with search bar & category dropdown  
- **Product Detail Page** with rating, description, and add-to-cart  
- **Shopping Cart** with quantity updates, removal, and price summary  
- **Checkout** with validation, confirmation UI, and order summary  
- **LocalStorage Caching** (products & categories stored after first fetch)  
- **Redux Toolkit Global State** (cart items, totals, qty, etc.)  
- **Toast Notifications** for:
  - Add to cart  
  - Remove item  
  - Update quantity  
  - Checkout success  
  - API errors  
  - Validation errors  

---

## ▶️ Getting Started

### **Clone using Git**
```bash
git clone https://github.com/animesh156/Ecommerce-Assignment.git
cd minishop
```

### **Install dependencies**
```bash
npm install
```

### **Start the development server**
```bash
npm run dev
```

Visit the app at:

```
http://localhost:5173
```

---

## 🧠 Design Decisions

- **Redux Toolkit** chosen for clean and predictable global state management.
- **LocalStorage caching** reduces redundant API calls and improves performance.
- **Tailwind CSS** used for fast UI development and responsive styling.
- **No external query library** (React Query) since localStorage + manual caching satisfies requirements.
- **Manual try/catch** used in API calls + UI for better error feedback.

---

## ⚖️ Trade-offs

- ❌ **No backend persistence**
- ⏳ **Cache never expires**
- 🔄 **Manual API caching** instead of React Query

---

## 🔥 Bonus Enhancements

- **Skeleton Loading UI** for product listing   
- **Toast Notifications Everywhere**  
- **Modern Responsive UI** using TailwindCSS  
- **Reusable Components** (`Loader`, `SkeletonGrid`, `ProductCard`, etc.)  
- **Live Cart Summary** via Redux  
- **Clean Folder Structure**  
```
src/
├── api/
├── components/
├── pages/
├── store/
├── utils/
├── App.jsx
└── main.jsx
```

---

## 💻 Tech Stack

- React (Vite)  
- Redux Toolkit  
- React Router  
- Tailwind CSS  
- React Hot Toast  
- Fake Store API

---

