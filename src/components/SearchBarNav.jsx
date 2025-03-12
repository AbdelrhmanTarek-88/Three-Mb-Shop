import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Categories, SearchBar } from "./search-bar";
import styled from "styled-components";
function SearchBarNav() {
  return (
    <StyledSearchBarNav className="bg-dark bg-gradient">
      <Container className="d-flex gap-2 py-3 justify-content-evenly align-items-center ">
        <Categories/>
        <SearchBar />
      </Container>
    </StyledSearchBarNav>
  );
}
SearchBarNav.propTypes = {
  displayDiv: PropTypes.string.isRequired,
  displaybtn: PropTypes.string.isRequired,
};
export default SearchBarNav;
const StyledSearchBarNav = styled.div``;
