import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = sessionStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  useEffect(() => {
    sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
    }
  };
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
  };
  const clearWishlist = () => {
    setWishlist([]);
  };
  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default WishlistContext; 
