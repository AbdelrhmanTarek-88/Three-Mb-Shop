import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types";
import { useWishlist, useCart, useToast } from "../state/hooks";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";
function ProductCard({ product }) {
  const token = sessionStorage.getItem("token") || "";
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [active, setActive] = useState(false);
  const [spanText, setSpanText] = useState("Add to Cart");
  const [showRegular, setShowRegular] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!token) {
      showToast("You need to log in first!");
      return;
    }
    addToCart(product);
    setSpanText("Added!");
    setActive(true);
    setTimeout(() => {
      setActive(false);
      setSpanText("Add to Cart");
    }, 2000);
  };
  const handleClick2 = (product) => {
    if (!token) {
      showToast("You need to log in first!");
      return;
    }
    addToWishlist(product);
    setShowRegular(true);
    setTimeout(() => {
      setShowRegular(false);
    }, 2000);
  };
  const Link = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <StyledWrapper className="card-cont">
      <div className="card">
        <span
          className={`addToCart ${active ? "active" : ""}`}
          onClick={handleClick}
        >
          {spanText}
        </span>
        <span
          className="wishList d-flex align-items-center justify-content-center"
          onClick={() => handleClick2(product)}
        >
          {showRegular ? <FaHeart /> : <FaRegHeart />}
        </span>
        <div className="image">
          <LazyLoadImage
            src={product.image}
            alt={product.title}
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              mixBlendMode: "multiply",
            }}
          />
        </div>
        <p className="title" onClick={() => Link(product.id)}>
          {product.title}
        </p>
        <p className="price">$ {product.price}</p>
      </div>
    </StyledWrapper>
  );
}
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
export default ProductCard;
const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14.875em;
    height: 22em;
    box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
    transition: all 120ms;
    background: #fff;
    padding: 0.5em;
    padding-bottom: 3.4em;
    border-radius: 20px 20px 11px 11px;
    overflow: hidden;
  }
  .card .addToCart {
    padding-top: 1.25em;
    padding-left: 1.25em;
    position: absolute;
    left: 0;
    bottom: -60px;
    background: #313538;
    color: #fff;
    height: 3.5em;
    width: 100%;
    transition: all 300ms;
    font-weight: 600;
    text-transform: uppercase;
    opacity: 0;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
    z-index: 100;
    visibility: hidden;
  }
  .card .wishList {
    position: absolute;
    left: -20px;
    top: 75px;
    background: #dc3545;
    color: #fff;
    border-radius: 50%;
    display: inline-block;
    width: 35px;
    height: 35px;
    font-size: 20px;
    text-align: center;
    transition: all 300ms;
    opacity: 0;
    cursor: pointer;
    z-index: 100;
    visibility: hidden;
  }
  .card:hover .wishList {
    opacity: 0.9;
    left: 5px;
    transition: all 1s;
    visibility: visible;
  }
  .card .title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    position: absolute;
    left: 0.625em;
    top: 15.875em;
    font-weight: 400;
    color: #000;
    cursor: pointer;
    transition: all 1s;
  }
  .card .title:hover {
    color: #dc3545;
    transition: all 1s;
  }
  .card .price {
    font-weight: bold;
    font-size: 0.9em;
    position: absolute;
    right: 1.625em;
    bottom: 0.3em;
    color: #000;
  }
  .card:hover .addToCart {
    bottom: 0;
    opacity: 0.9;
    transition: all 1s;
    visibility: visible;
  }
  .card:active {
    transform: scale(0.98);
  }
  .addToCart.active {
    content: "Added !";
    height: 3.5em;
    transition-delay: 2s;
    transition: all 2s;
  }
  .text {
    max-width: 45px;
  }
  .image {
    background: rgb(241, 241, 241);
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    margin-bottom: 70px;
    border-radius: 11px;
  }
  @media (min-width: 381px) and (max-width: 509px) {
    .card {
      max-width: 10.875em;
      height: 24em;
    }
    .card .image {
      margin-bottom: 100px;
    }
    .card .image img {
      width: 80%;
    }
  }
`;
