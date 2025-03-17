import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Image,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../state/hooks";
import { TitleName } from "../components";
import { Cartimg } from "../assets/image";
import styled from "styled-components";
const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const Link = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <StyledCartPage>
      <TitleName name="Shopping Cart" />
      <Container className="mt-5">
        {cart.length === 0 ? (
          <>
            <p className="fs-4 fw-bold fst-italic">
              Your Shopping Cart is empty.
            </p>
            <img src={Cartimg} />
          </>
        ) : (
          <Row>
            <Col md={12}>
              <Table responsive bordered>
                <thead>
                  <tr className="text-center">
                    <th>Product</th>
                    <th>Price</th>
                    <th className="header-quantity">Quantity</th>
                    <th className="header-total">Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="align-middle text-center">
                      <td className="d-flex align-items-center img-text-display">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="me-3 m-2 "
                        />
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => Link(item.id)}
                        >
                          {item.title}
                        </span>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <Button
                          className="rounded-4"
                          variant="outline-secondary"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={10} />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          className="rounded-4"
                          variant="outline-secondary"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <FaPlus size={10} />
                        </Button>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          &times;
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col md={{ span: 6, offset: 6 }}>
              <Card className="p-3 shadow-sm my-4">
                <h5>Cart Totals</h5>
                <hr />
                <p className="d-flex justify-content-between">
                  <span>Cart Subtotal:</span>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </p>
                <p className="d-flex justify-content-between">
                  <span>Shipping:</span>
                  <strong>Free Shipping</strong>
                </p>
                <hr />
                <p className="d-flex justify-content-between fs-5">
                  <strong>Total:</strong>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </p>
                <Button
                  variant="danger"
                  size="lg"
                  className="w-100 mt-2"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </StyledCartPage>
  );
};
const StyledCartPage = styled.div`
  .header-quantity {
    min-width: 120px;
  }
  .header-total {
    width: 90px;
  }
  @media (max-width: 768px) {
    .img-text-display {
      flex-direction: column;
    }
  }
`;
export default CartPage;
