import { useContext } from "react";
import {WishlistContext} from "../context";
const useWishlist = () => {
  return useContext(WishlistContext);
};
export default useWishlist;
