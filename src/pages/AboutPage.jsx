import { Container, Row, Col } from "react-bootstrap";
import { TitleName } from "../components";
import { AboutUs } from "../assets/image";
function AboutPage() {
  return (
    <>
      <TitleName name="About Us" />
      <Container className="mt-5">
        <Row className="align-items-center">
          <Col md={{ span: 5, offset: 1 }}>
            <img
              src={AboutUs}
              alt="About Us"
              className="img-fluid rounded mb-5"
            />
          </Col>
          <Col md={{ span: 5, offset: 0 }}>
            <h2 className="fw-bold">Who We Are</h2>
            <p className="text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur quibusdam enim expedita sed nesciunt incidunt
              accusamus adipisci officia libero laboriosam!
            </p>
            <p className="text-muted">
              Proin gravida nibh vel velit auctor aliquet. Nec sagittis sem nibh
              id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet
              mauris. Duis sed odio sit amet nibh vulputate cursus a sit amet
              mauris.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default AboutPage;
