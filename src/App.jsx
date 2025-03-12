import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import {
  NavigationBar,
  Footer,
  ProtectedRoute,
  ScrollToTop,
} from "./components";
import {
  Home,
  AboutPage,
  ContactPage,
  ProductPage,
  ProductDetailsPage,
  WishlistPage,
  CartPage,
  CheckoutPage,
  TermsPage,
  LoginPage,
  NotFoundPage,
  UserDashboardPage,
} from "./pages";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account/*" element={<UserDashboardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
const MainLayout = () => {
  return (
    <>
      <NavigationBar />
      <main
        className="main-content"
        style={{ minHeight: "calc(100vh - 110px)" }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
