import { createContext,useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchProducts } from "../../services/api";
const ProductContext = createContext({});
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(`Failed to load products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProductContext;
