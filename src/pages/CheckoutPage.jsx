import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { useOrder, useUser, useCart } from "../state/hooks";
import { TitleName } from "../components";
import { IoIosClose } from "react-icons/io";
const CheckoutPage = () => {
  const { cart } = useCart();
  const { user } = useUser();
  const { addOrder } = useOrder();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cart, navigate]);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? "Free" : "$0";
  const total = subtotal;
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: `#${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Processing",
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };
    addOrder(newOrder);
    Swal.fire({
      icon: "success",
      title: "Your Order Is Completed!",
      text: "Thank you for your order! Your order is being processed and will be completed within 3-6 hours.",
      confirmButtonText: "Continue Shopping",
      confirmButtonColor: "#d9534f",
    }).then(() => {
      clearCart();
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 200);
    });
  };
  return (
    <>
      <TitleName name="Checkout" />
      <Container className="mt-5">
        <Row>
          <Col md={7}>
            <h2 className="fw-bold mb-4">Billing Details</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Name"
                  value={user?.fullName || ""}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your Email"
                  value={user?.email || ""}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Town/City*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your City"
                  value={user?.city || ""}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Street Address*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123 Street Name"
                  value={user?.streetAddress || ""}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Company (Optional)" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Apartment, floor, etc. </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apartment, suite, unit (Optional)"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Your Phone Number"
                  value={user?.phoneNumber || ""}
                  disabled
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={5}>
            <h2 className="fw-bold mb-4">Order Summary</h2>
            <Card className="p-3 mb-3">
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div
                      className={`d-flex justify-content-between mb-3 ${
                        index !== cart.length - 1 ? "border-bottom pb-3" : ""
                      } `}
                      key={item.id}
                    >
                      <span className="me-1">
                        <span className="me-2 text-secondary">{`[${
                          index + 1
                        }]`}</span>
                        {item.title}
                        <span className="fw-bold ms-1">
                          <IoIosClose size={25} />
                          {item.quantity}
                        </span>
                      </span>
                      <div className="text-danger fw-bold text-danger">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <div className="fw-bold">${subtotal.toFixed(2)}</div>
                  </div>
                  <div className="d-flex justify-content-between my-3">
                    <span>Shipping:</span>
                    <div className="fw-bold">{shipping}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Total:</span>
                    <div className="fw-bold">${total.toFixed(2)}</div>
                  </div>
                </>
              )}
            </Card>
            <h5 className="mb-3">Payment Method</h5>
            <Form.Check
              type="radio"
              label="Bank"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Group className="my-3 d-flex gap-2">
              <Form.Control type="text" placeholder="Coupon Code" />
              <Button variant="danger">Apply Coupon</Button>
            </Form.Group>
            <Button
              variant="danger"
              className="w-100 my-4"
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
            >
              Place Order
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CheckoutPage;
