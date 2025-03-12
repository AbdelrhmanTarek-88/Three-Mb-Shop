import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logo } from "../assets/image";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube, IoLogoWhatsapp } from "react-icons/io";
import styled from "styled-components";
function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <StyledFooter>
        <Container>
          <Row>
            <Col md={4}>
              <img src={logo} alt="" className="my-5" />
            </Col>
            <Col md={3}>
              <h5>Support</h5>
              <p>111 Alex, Alexendra, Egypt.</p>
              <p>threeMB@gmail.com</p>
              <p>+02012-012012-9999</p>
            </Col>
            <Col md={2}>
              <h5>Quick Link</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/terms" className="text-white text-decoration-none">
                    Terms Of Use
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-white text-decoration-none"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white text-decoration-none">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white text-decoration-none"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Social media</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="https://facebook.com/3mb.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <FaFacebook size={20} /> Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/3mb.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <RiInstagramFill size={20} /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/3mb.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <FaXTwitter size={20} /> Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/@3mb.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <IoLogoYoutube size={20} /> YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/your_whatsapp_number"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <IoLogoWhatsapp size={20} /> WhatsApp
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <hr className="my-4" />
          <p className="text-center mb-0">
            © Copyright Three MB Shop {new Date().getFullYear()}. All rights
            reserved
          </p>
        </Container>
      </StyledFooter>
    </footer>
  );
}
export default Footer;
const StyledFooter = styled.div`
  h5 {
    color: #dc3545;
  }
`;
