import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const OrderContext = createContext();
export const OrderProvider = ({ children }) => {
  const initialOrders = JSON.parse(sessionStorage.getItem("orders")) || [];
  const [orders, setOrders] = useState(initialOrders);
  useEffect(() => {
    sessionStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };
  const clearOrders = () => {
    setOrders([]);
  };
  return (
    <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default OrderContext;
