import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { TitleName } from "../components";
import {
  SidebarMenu,
  Orders,
  Address,
  AccountDetails,
} from "../components/user-dashboard";
import styled from "styled-components";
const UserProfile = () => {
  return (
    <>
      <TitleName name="My Account" />
      <Container className="my-5">
        <Row>
          <Col md={3}>
            <SidebarMenu />
          </Col>
          <Col md={9}>
            <MainStyled>
              <div className="cont">
                <Routes>
                  <Route index element={<Navigate to="orders" />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="address" element={<Address />} />
                  <Route path="account-details" element={<AccountDetails />} />
                </Routes>
              </div>
            </MainStyled>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UserProfile;
const MainStyled = styled.div`
  @media (min-width: 768px) and (max-width: 995px) {
    .cont {
      width: 500px;
      margin-left: 45px;
    }
  }
`;
