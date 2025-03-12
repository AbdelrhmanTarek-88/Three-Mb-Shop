import { useContext } from "react";
import {OrderContext} from "../context"
const useOrders = () => {
  return useContext(OrderContext);
};
export default useOrders;
