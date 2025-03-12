import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import {TitleName} from "../components";
import styled from "styled-components";
function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in all fields!",
        confirmButtonColor: "#dc3545",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Thank You!",
      text: "Your message has been sent successfully. We will contact you soon.",
      confirmButtonColor: "#dc3545",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };
  return (
    <StyledContactPage>
      <TitleName name="Contact Us" />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={4} className="contact-box p-4 shadow bg-white rounded mx-1">
            <div className="d-flex align-items-center mb-3">
              <FaPhoneAlt className="icon-style me-3" />
              <h5 className="fw-bold">Call To Us</h5>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p className="fw-bold">Phone: +201201201211</p>
            <hr />
            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="icon-style me-3" />
              <h5 className="fw-bold">Write To Us</h5>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p className="fw-bold">Emails: customer@threeMB.com</p>
            <p className="fw-bold">Emails: support@threeMB.com</p>
          </Col>
          <Col md={7} className="p-4 shadow bg-white rounded mx-1">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Your Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Your Email *"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Your Phone *"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit" variant="danger" className="w-100">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </StyledContactPage>
  );
}
export default ContactPage;
const StyledContactPage = styled.div`
  .contact-box {
    border-radius: 8px;
    background: #fff;
  }
  .icon-style {
    font-size: 24px;
    color: #dc3545;
  }
`;
