import Carousel from "react-multi-carousel";
import { Container } from "react-bootstrap";
import {
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
} from "../../assets/image";
import styled from "styled-components";
const BrandsSlider = () => {
  const brands = [
    { id: 1, img: brand1 },
    { id: 2, img: brand2 },
    { id: 3, img: brand3 },
    { id: 4, img: brand4 },
    { id: 5, img: brand5 },
    { id: 6, img: brand6 },
    { id: 7, img: brand7 },
  ];
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };
  return (
    <StyleBrandsSlider className="text-center w-100">
      <Container>
        <div className="d-flex gap-2 mt-5">
          <span
            className="d-inline-block bg-danger mt-2 rounded-2"
            style={{
              width: "20px",
              height: "40px",
            }}
          ></span>
          <p className="text-danger mt-2 text-uppercase fs-3">Our Brands</p>
        </div>
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          arrows={false}
        >
          {brands.map((brand) => (
            <div key={brand.id} className="p-4">
              <img
                src={brand.img}
                alt={`Brand ${brand.id}`}
                className="brand-img"
              />
            </div>
          ))}
        </Carousel>
      </Container>
    </StyleBrandsSlider>
  );
};
export default BrandsSlider;
const StyleBrandsSlider = styled.div`
  .brand-img {
    max-width: 150px;
  }
`;
