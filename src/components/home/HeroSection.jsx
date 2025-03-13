import { Container, Carousel } from "react-bootstrap";
import { CarouselItems } from "./";
const HeroSection = () => {
  return (
    <Container fluid style={{ background: "#f6f6f6" }}>
      <Carousel interval={3500} fade data-bs-theme="dark">
        <Carousel.Item>
          <CarouselItems
            title={"Dual Camera 20MP"}
            description={"Get up to 50% off Today Only!"}
            image={"1"}
          />
        </Carousel.Item>
        <Carousel.Item>
          <CarouselItems
            title={"Smart Watches"}
            description={"50% off in all products"}
            image={"2"}
          />
        </Carousel.Item>
        <Carousel.Item>
          <CarouselItems
            title={"Beat Headphone"}
            description={"Taking your Viewing Experience to Next Level"}
            image={"3"}
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default HeroSection;
