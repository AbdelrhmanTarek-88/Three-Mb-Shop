import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Offcanvas, Button, ListGroup, Spinner, Alert } from "react-bootstrap";
import { fetchCategories } from "../../services/api";
import { FaBars, FaSprayCanSparkles } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { PiWatchDuotone, PiDeviceMobileDuotone } from "react-icons/pi";
import { HiHome } from "react-icons/hi2";
import { FaTshirt, FaCouch, FaShoppingBasket } from "react-icons/fa";
import { GiLipstick, GiForkKnifeSpoon } from "react-icons/gi";
import { AiOutlineLaptop } from "react-icons/ai";
import { LiaShoePrintsSolid } from "react-icons/lia";

import styled from "styled-components";
function Categories() {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.slice(0, 11));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);
  if (loading) return <Spinner animation="grow" variant="danger" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  const Icons = {
    Category1: GiLipstick,
    Category2: FaSprayCanSparkles,
    Category3: FaCouch,
    Category4: FaShoppingBasket,
    Category5: HiHome,
    Category6: GiForkKnifeSpoon,
    Category7: AiOutlineLaptop,
    Category8: FaTshirt,
    Category9: LiaShoePrintsSolid,
    Category10: PiWatchDuotone,
    Category11: PiDeviceMobileDuotone,
  };
  return (
    <StyleCategories>
      <div>
        <Button
          variant="danger"
          onClick={() => setShow(true)}
          className="categories-btn"
        >
          <FaBars />
          <span className="d-none d-sm-inline mx-2">Categories</span>
        </Button>
      </div>
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="start"
        style={{ maxWidth: "300px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-danger fw-bold fs-2">
            Categories
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item action onClick={() => navigate("/product")}>
              <TbCategoryFilled size={20} /> All Products
            </ListGroup.Item>
            {categories.map((category, index) => {
              const IconCategory = Icons[`Category${index + 1}`];
              return (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => {
                    navigate(`/product?category=${category}`);
                    setShow(false);
                  }}
                >
                  {IconCategory && (
                    <IconCategory size={25} style={{ marginRight: "8px" }} />
                  )}
                  {category}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </StyleCategories>
  );
}
export default Categories;
const StyleCategories = styled.div`
  @media (min-width: 576px) and (max-width: 768px) {
    .categories-btn {
      width: 147px;
    }
  }
`;
