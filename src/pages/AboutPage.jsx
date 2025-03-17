import { Container, Row, Col } from "react-bootstrap";
import { TitleName, FeatureSection } from "../components";
import { AboutUs } from "../assets/image";
function AboutPage() {
  return (
    <>
      <TitleName name="About Us" />
      <Container className="mt-5">
        <Row className="align-items-start">
          <Col md={6} lg={{ span: 5, offset: 1 }}>
            <img
              src={AboutUs}
              alt="About Us"
              className="img-fluid rounded mb-5"
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold">Who We Are</h2>
            <p className="text-muted">
              Welcome to <span className="fw-bold">Three MB Shop</span>, your
              go-to online store for a unique shopping experience! We are a
              passionate team dedicated to bringing you top-quality products at
              competitive prices.
            </p>
            <p className="text-muted">
              At <span className="fw-bold">Three MB Shop</span>, we prioritize
              customer satisfaction by offering a seamless and enjoyable
              shopping journey. Our goal is to provide a wide range of
              high-quality products that cater to all your needs.
            </p>

            <h3 className="fw-bold mt-4">Why Choose Us?</h3>
            <ul className="text-muted ps-3">
              <li className="my-2">
                <span className="fw-bold">Premium Quality:</span> Carefully
                selected products to ensure top-notch standards.
              </li>
              <li className="my-2">
                <span className="fw-bold">User-Friendly Experience:</span> A
                simple and intuitive interface for effortless navigation.
              </li>
              <li className="my-2">
                <span className="fw-bold">Reliable Support:</span> Our customer
                service team is always ready to assist you.
              </li>
              <li className="my-2">
                <span className="fw-bold">Exclusive Offers:</span> Enjoy special
                discounts and promotions throughout the year.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <FeatureSection />
    </>
  );
}
export default AboutPage;
