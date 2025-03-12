import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { useUser } from "../state/hooks";
import { FaUser, FaHeart, FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { SiGooglehome } from "react-icons/si";
import { BsInfoCircleFill, BsEnvelopeAtFill } from "react-icons/bs";
import {Logo} from "./";
const NavigationBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { user, setUser, setUserId } = useUser();
  const handleLogout = () => {
    navigate("/login");
    sessionStorage.clear();
    setUser(null);
    setUserId(null);
  };
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{ height: "80px" }}
      sticky="top"
    >
      <Container>
        <Navbar.Brand className="ms-2" as={Link} to="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvas-navbar"
          onClick={() => setShow(true)}
        />
        <Navbar.Collapse id="navbar-nav" className="d-none d-lg-flex">
          <Nav className="mx-auto">
            <Nav.Link className="mx-xl-3" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="mx-xl-3" as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link className="mx-xl-3" as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/account">
                  <FaUser size={20} /> {user.fullName}
                </Nav.Link>
                <Nav.Link as={Link} to="/wishlist">
                  <FaHeart size={20} />
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  <FaShoppingCart size={20} />
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <IoIosLogOut size={20} /> Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <FaSignInAlt size={20} /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        className="d-lg-none"
        style={{ maxWidth: "300px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-danger fw-bold fs-2">
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-grow-1 pe-3">
            <Nav.Link as={Link} to="/" onClick={() => setShow(false)}>
              <SiGooglehome size={20} /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setShow(false)}>
              <BsInfoCircleFill size={20} /> About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setShow(false)}>
              <BsEnvelopeAtFill size={20} /> Contact
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/account">
                  <FaUser size={20} /> {user.fullName}
                </Nav.Link>
                <Nav.Link as={Link} to="/wishlist">
                  <FaHeart size={20} /> Wishlist
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  <FaShoppingCart size={20} /> Cart
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <IoIosLogOut size={20} /> Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <FaSignInAlt size={20} /> Login
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
};
export default NavigationBar;
