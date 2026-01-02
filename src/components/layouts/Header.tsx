import React, { useEffect } from "react";
import styled from "styled-components";
import { useLogin } from "../../context/loginContext";
import { Link } from "react-router-dom";
import CalendarMonth from "../cards/accounts/CalendarMonth";
import { GetUserBookApi, UserLogoutApi } from "../../api/sehomallApi";
import TopNav from "./TopNav";

const Header = () => {
  const { isLogin, setIsLogin } = useLogin();
  const { setMyBook } = useLogin();
  const { setTransList } = useLogin();

  useEffect(() => {
    GetUserBookApi()
      .then((res) => {
        console.log(res);
        setMyBook(res?.data ?? null);

        if (res?.headers?.accesstoken) {
          localStorage.setItem("accessToken", res?.headers?.accesstoken);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.detailMessage) {
          console.error(err.response.data.detailMessage);
        } else {
          console.error(err?.message);
        }
      });
  }, [setMyBook]);

  const handleLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) {
      return;
    }

    UserLogoutApi()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    localStorage.removeItem("nickname");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setIsLogin(false);

    setTransList([]);
  };

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
