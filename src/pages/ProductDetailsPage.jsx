import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import InnerImageZoom from "react-inner-image-zoom";
import { FaHeart, FaStar } from "react-icons/fa";
import { useWishlist, useCart, useToast, useProduct } from "../state/hooks";
import {
  TitleName,
  FeatureSection,
  BtnStyled,
  SearchBarNav,
} from "../components";
import styled from "styled-components";
const ProductDetails = () => {
  const token = sessionStorage.getItem("token") || "";
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { products } = useProduct();
  const product = products.find((item) => item.id === Number(id));
  if (!product)
    return <p className="text-danger text-center fw-bold">Product Not Found</p>;
  const handleClick = () => {
    if (!token) {
      showToast("You need to log in first!");
      return;
    }
    addToCart(product);
    showToast("Added To Cart", "light", true, "Go To Cart", () =>
      navigate("/cart")
    );
  };
  const handleClick2 = () => {
    if (!token) {
      showToast("You need to log in first!");
      return;
    }
    addToWishlist(product);
    showToast("Added To Wishlist", "light", true, "Go To Wishlist", () =>
      navigate("/wishlist")
    );
  };
  return (
    <StyledWrapper>
      <SearchBarNav />
      <TitleName name="Product Detail" />
      <Container className="mt-5">
        <Row>
          <Col
            sm={12}
            md={3}
            lg={6}
            className="d-flex justify-content-start align-items-start"
          >
            <div className="product-image my-4 text-center">
              <InnerImageZoom
              // <img
                src={product.image}
                alt={product.title}
                className="img-fluid"
                zoomSrc={product.image}
                zoomScale={1.5}
                zoomType="hover"
              />
            </div>
          </Col>
          <Col sm={12} md={5} lg={6} className="my-4">
            <h3>{product.title}</h3>
            <h4 className="text-danger">${product.price}</h4>
            <p>
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < Math.round(product.rating)
                      ? "text-warning"
                      : "text-muted"
                  }
                />
              ))}
              ({product.reviewsCount})
            </p>
            <p>{product.description}</p>
            <div className="d-flex align-items-center gap-1 my-4">
              <BtnStyled onClick={handleClick} />
              <Button variant="outline-dark" onClick={handleClick2}>
                <FaHeart />
              </Button>
            </div>
            <p className="mt-4">
              <span className="fw-bold">Category:</span> {product.category}
            </p>
          </Col>
        </Row>
      </Container>
      <FeatureSection />
    </StyledWrapper>
  );
};
export default ProductDetails;
const StyledWrapper = styled.div`
  .product-image {
    border: 8px solid #ddd;
    padding: 10px;
    width: 400px;
    background: #f1f1f1;
    border-radius: 10px;
  }
  .img-fluid {
    mix-blend-mode: multiply;
    max-width: 350px;
    max-height: 400px;
    .iiz__img {
      max-height: 400px;
    }
    @media (max-width: 480px) {
      max-width: 325px;
    }
  }
  .d-flex.justify-content-start {
    width: 400px;
  }
`;
