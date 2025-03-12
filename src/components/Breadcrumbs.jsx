import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import styled from "styled-components";
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <StyledWrapper>
      <Breadcrumb className="custom-breadcrumb">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Breadcrumb.Item key={name} active>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item
              key={name}
              linkAs={Link}
              linkProps={{ to: routeTo }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </StyledWrapper>
  );
};
export default Breadcrumbs;
const StyledWrapper = styled.div`
  .custom-breadcrumb {
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
  }
  .custom-breadcrumb .breadcrumb-item a {
    color: rgb(216, 214, 214);
    text-decoration: none;
    font-weight: bold;
    transition: all 0.5s;
  }
  .custom-breadcrumb .breadcrumb-item a:hover {
    color: rgb(97, 4, 4);
  }
  .custom-breadcrumb .breadcrumb-item.active {
    color: #f1f1f1;
  }
  .breadcrumb-item:not(:first-child)::before {
    content: ">";
    margin: 0px 4px;
    color: rgb(131, 16, 16);
    font-weight: bold;
    font-size: 19px;
  }
`;
