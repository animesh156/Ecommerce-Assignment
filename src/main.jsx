
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* Global Toast Provider */}
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <App />
    </BrowserRouter>
  </Provider>
);
