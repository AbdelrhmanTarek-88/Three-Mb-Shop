import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CloseButton } from "react-bootstrap";
import { useToast } from "../state/hooks";
import { BtnStyled } from "./";
import styled from "styled-components";
const WishlistItem = ({ product, removeFromWishlist, addToCart }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const handleClick = () => {
    showToast("Item Moved To Your Cart!","light");
    addToCart(product);
  };
  const Link = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <StyledWishlistItem className="  d-flex align-items-center justify-content-between ">
      <div className="product-info d-flex align-items-center">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <span
          className="fw-bold link-dark"
          style={{ cursor: "pointer" }}
          onClick={() => Link(product.id)}
        >
          {product.title}
        </span>
      </div>
      <span className="product-price text-center fs-5">${product.price}</span>
      <span className="stock-status text-center fw-bold">In Stock</span>
      <BtnStyled onClick={handleClick} />
      <CloseButton
        onClick={() => removeFromWishlist(product.id)}
        variant="danger"
      ></CloseButton>
    </StyledWishlistItem>
  );
};
WishlistItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromWishlist: PropTypes.func.isRequired,
};
export default WishlistItem;
const StyledWishlistItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  height: 120px;
  .product-info {
    width: 375px;
  }
  .product-image {
    width: 120px;
    height: 120px;
    object-fit: contain;
    margin-right: 10px;
    margin-bottom: 10px;
    mix-blend-mode: multiply;
  }
  .product-price {
    width: 70px;
    margin-right: 10px;
  }
  .stock-status {
    background: #198754;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    width: 100px;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
    height: auto;
    align-items: center;
    text-align: center;
    gap: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    .product-info {
      flex-direction: column;
      width: 100%;
    }
    .product-image {
      margin-bottom: 5px;
    }
  }
`;
