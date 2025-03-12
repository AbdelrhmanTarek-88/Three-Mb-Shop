import { NavLink, useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useOrder, useUser } from "../../state/hooks";
import { FaTruck, FaAddressCard } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import styled from "styled-components";
const SidebarMenu = () => {
  const navigate = useNavigate();
  const { clearOrders } = useOrder();
  const { setUser, setUserId } = useUser();
  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    setUserId(null);
    navigate("/login");
    clearOrders();
  };
  return (
    <SideMenuStyled className="mb-5">
      <ListGroup>
        <ListGroup.Item action as={NavLink} to="/account/orders">
          <FaTruck size={"25px"} />
          <span>Orders</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/account/address">
          <ImLocation size={"25px"} />
          <span>My Address</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/account/account-details">
          <FaAddressCard size={"25px"} />
          <span>Account Details</span>
        </ListGroup.Item>
        <ListGroup.Item action onClick={handleLogout}>
          <IoIosLogOut size={"25px"} />
          <span>Logout</span>
        </ListGroup.Item>
      </ListGroup>
    </SideMenuStyled>
  );
};
export default SidebarMenu;
const SideMenuStyled = styled.div`
  box-shadow: 0 4px 10px 3px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  .list-group-item {
    gap: 15px;
    display: flex;
    padding: 15px 0px 15px 25px;
    align-items: center;
    font-size: 18px;
    transition: all 0.5s;
    &:hover {
      background-color: rgb(228, 228, 228);
    }
  }
  .list-group-item.active {
    background: #ff324d;
    color: #fff;
    border-color: transparent;
    transition: all 0.5s;
  }
  @media (min-width: 768px) and (max-width: 995px) {
    .list-group-item {
      width: 220px;
    }
  }
`;
