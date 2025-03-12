import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
function BtnStyled({
  onClick = () => {},
  background = "danger",
  borderRadius = "20px",
  width = "170px",
  text = (
    <span>
      <FaShoppingCart /> Add To Cart
    </span>
  ),
  type = "button",
  hover = {},
}) {
  return (
    <StyledButton
      className="add-to-cart mx-2 d-flex justify-content-center align-items-center position-relative z-3"
      variant={background}
      type={type}
      width={width}
      border-radius={borderRadius}
      onClick={onClick}
      hover={hover}
    >
      {text}
    </StyledButton>
  );
}
BtnStyled.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  width: PropTypes.string,
  type: PropTypes.string,
  background: PropTypes.string,
  borderRadius: PropTypes.string,
  hover: PropTypes.shape({
    background: PropTypes.string,
    color: PropTypes.string,
    border: PropTypes.string,
  }),
};
export default BtnStyled;
const StyledButton = styled(Button)`
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  height: 40px;
  overflow: hidden;
  transition: all 0.5s;
  svg {
    margin-right: 5px;
  }
  &:hover {
    color: ${(props) => props.hover.color || "#dc3545"};
    background-color: ${(props) => props.hover.background || "#dc3545"};
    border: ${(props) => props.hover.border || "1px #dc3545 solid"};
  }
  &:active {
    background-color: ${(props) =>
      props.hover.background || "#dc3545"} !important;
    border-color: ${(props) => props.hover.background || "#dc3545"} !important;
  }
  &:after {
    content: "";
    background: white;
    position: absolute;
    z-index: -1;
    left: -20%;
    right: -20%;
    top: 0;
    bottom: 0;
    transform: scale(0, 1);
    transition: all 0.5s;
  }
  &:hover:after {
    transform: scale(1, 1);
    transition: all 0.5s;
  }
  &:active:after {
    background-color: ${(props) =>
      props.hover.background || "#dc3545"} !important;
  }
`;
