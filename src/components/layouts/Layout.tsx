import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Layout = ({
  isTopNav = false,
  children,
}: {
  isTopNav?: boolean;
  children: React.ReactNode;
}) => {
  const navigator = useNavigate();

  return (
    <Container>
      {isTopNav && <Header />}
      <Wrapper style={isTopNav ? { paddingTop: "50px" } : {}}>
        {children}
      </Wrapper>
      <AddTransButton onClick={() => navigator("/add-transaction")}>
        +
      </AddTransButton>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 20px;
  box-sizing: border-box;
`;

const AddTransButton = styled.button`
  position: fixed;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: none;
  background-color: lightblue;
  font-size: 25px;
  right: 10px;
  bottom: 80px;
  z-index: 200;
`;
