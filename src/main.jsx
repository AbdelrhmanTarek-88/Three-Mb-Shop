import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  UserProvider,
  ToastProvider,
  OrderProvider,
  ProductProvider,
  CartProvider,
  WishlistProvider,
} from "./state/context";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-multi-carousel/lib/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "./assets/style/App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ToastProvider>
        <OrderProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </OrderProvider>
      </ToastProvider>
    </UserProvider>
  </StrictMode>
);
