import PropTypes from "prop-types";
import { Carousel, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { banner1, banner2, banner3 } from "../../assets/image";
const CarouselItems = ({ title, description, image }) => {
  const images = {
    1: banner1,
    2: banner2,
    3: banner3,
  };
  return (
    <>
      <Container className="mt-3 d-flex justify-content-end">
        <img
          className="d-block w-80"
          src={images[image]}
          alt={image}
          style={{ mixBlendMode: "multiply" }}
        />
      </Container>
      <Carousel.Caption>
        <motion.h3
          className="text-danger fs-1 fw-bold"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {title}
        </motion.h3>
        <motion.div
          className="text-danger fs-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {description}
        </motion.div>
      </Carousel.Caption>
    </>
  );
};
CarouselItems.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default CarouselItems;
