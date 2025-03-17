import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button, ListGroup } from "react-bootstrap";
import { 
  // fetchFakeStoreProducts 
  fetchProducts
} from "../../services/api";
import { IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";
function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const products = await fetchProducts();
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchSuggestions();
  }, [query]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length) {
      navigate(`/product?q=${query}`);
    }
  };
  return (
    <StyledSearchBar className="position-relative w-100">
      <Form
        onSubmit={handleSearch}
        className="search-bar d-flex align-items-center w-100"
      >
        <FormControl
          type="text"
          placeholder="Search Product..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <Button type="submit" variant="danger" className="search-btn">
          <IoSearchOutline size={25} />
        </Button>
      </Form>
      {showSuggestions && suggestions.length > 0 && (
        <ListGroup className="search-suggestions position-absolute top-100 start-0 end-0 z-3">
          {suggestions.map((item) => (
            <ListGroup.Item
              key={item.id}
              action
              onClick={() => navigate(`/product/${item.id}`)}
            >
              {item.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </StyledSearchBar>
  );
}
const StyledSearchBar = styled.div`
  max-width: 500px;
  .search-bar {
    border: 2px solid #ddd;
    border-radius: 50px;
    overflow: hidden;
    max-width: 500px;
  }
  .search-input {
    flex: 1;
    height: 46px;
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 0;
  }
  .search-btn {
    background: #e60028;
    border: none;
    padding: 10px 15px;
    border-radius: 0 50px 50px 0;
  }
  .search-suggestions {
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
`;
export default SearchBar;
