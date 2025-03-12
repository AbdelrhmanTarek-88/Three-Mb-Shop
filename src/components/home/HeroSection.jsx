import { Container, Row, Col, Carousel } from "react-bootstrap";
import {CarouselItems} from "./";
const HeroSection = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={{ span: 9, offset: 2}} md={{ span: 8, offset: 2 }}>
          <Carousel fade>
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
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
