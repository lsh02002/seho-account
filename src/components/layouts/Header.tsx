import React from "react";
import styled from "styled-components";
import { useLogin } from "../../context/loginContext";
import { Link } from "react-router-dom";
import CalendarMonth from "../cards/accounts/CalendarMonth";
import TopNav from "./TopNav";

const Header = () => {
  const { isLogin } = useLogin();

  const handleLogout = () => {};

  return (
    <Container>
      <Wrapper>
        <CalendarMonth />
        <TopNav />
        <StyledUserInfo>
          {!isLogin ? (
            <>
              <Link to={"/login"}>로그인</Link>
              <Link to={"/signup"}>회원가입</Link>
            </>
          ) : (
            <>
              <LinkButton onClick={handleLogout}>로그아웃</LinkButton>
              <Link to={"/mypage"}>마이페이지</Link>
            </>
          )}
        </StyledUserInfo>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: white;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  color: blue;
`;

const StyledUserInfo = styled.div`
  width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;

  a {
    color: blue;
    text-decoration: none;
  }
`;
