import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { PiArrowFatLineUpFill } from "react-icons/pi";
import styled from "styled-components";
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 5);
  }, [pathname]);
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const smoothScrollToTop = () => {
    if (window.innerWidth <= 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const scrollInterval = setInterval(() => {
        if (window.scrollY === 0) {
          clearInterval(scrollInterval);
        }
        window.scrollBy(0, -Math.max(10, window.scrollY / 3));
      }, 16);
      const stopOnUserScroll = () => {
        clearInterval(scrollInterval);
        window.removeEventListener("wheel", stopOnUserScroll);
        window.removeEventListener("touchmove", stopOnUserScroll);
      };
      window.addEventListener("wheel", stopOnUserScroll);
      window.addEventListener("touchmove", stopOnUserScroll);
    }
  };
  return (
    <StyledGoToUpBtn
      className={!showButton ? "hidden" : ""}
      variant="danger"
      onClick={smoothScrollToTop}
    >
      <PiArrowFatLineUpFill />
    </StyledGoToUpBtn>
  );
};
const StyledGoToUpBtn = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-size:25px;
  border-radius: 25px;
  padding: 0px;
  width: 45px;
  height: 45px;
  transition: 0.3s all ease-in-out;
  &.hidden {
    opacity: 0;
    visibility: hidden;
`;

export default ScrollToTop;
