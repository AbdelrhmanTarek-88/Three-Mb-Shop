import { Container, Row, Col } from "react-bootstrap";
import { FaShippingFast, FaHeadphones, FaShieldAlt } from "react-icons/fa";

function FeatureSection() {
  const features = [
    {
      icon: <FaShippingFast size={40} />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: <FaHeadphones size={40} />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <Container className="my-5 text-center">
      <Row className="g-4">
        {features.map((feature, index) => (
          <Col key={index} md={4} className="d-flex flex-column align-items-center">
            <div className="p-3 bg-light rounded-circle">{feature.icon}</div>
            <h5 className="mt-3 fw-bold">{feature.title}</h5>
            <p>{feature.description}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FeatureSection;
