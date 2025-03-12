import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Breadcrumbs } from "./";
import styled from "styled-components";
const TitleName = ({ name }) => {
  return (
    <StyledWrapper className="mt-1">
      <div className="tite-content">
        <Container>
          <h2 className="text-left mb-4  fw-bold">{name}</h2>
          <Breadcrumbs />
        </Container>
      </div>
    </StyledWrapper>
  );
};
TitleName.propTypes = {
  name: PropTypes.string.isRequired,
};
export default TitleName;
const StyledWrapper = styled.div`
  background: #b33440;
  border-radius: 0px 0px 35px 35px;
  margin: auto;
  padding: 25px;
  height: 150px;
  color: white;
  h2 {
    font-size: 2.5rem;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;
