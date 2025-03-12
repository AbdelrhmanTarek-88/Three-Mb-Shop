import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import {TitleName} from "../components";
const NotFound = () => {
  return (
    <>
      <TitleName name="Page Not Found" />
      <div className="d-flex justify-content-center align-items-center text-center" style={{minHeight: "calc(100vh - 250px)"}}>
        <Container className="text-center">
          <h1 className="display-1 fw-bold mt-3">404 Not Found</h1>
          <p className="text-muted">
            oops! The page you requested was not found!
          </p>
          <p className="text-muted">
            The page you are looking for was moved, removed, renamed or might
            never existed.
          </p>
          <Link to="/">
            <Button variant="danger" className="mt-3">
              Back to home page
            </Button>
          </Link>
        </Container>
      </div>
    </>
  );
};
export default NotFound;
