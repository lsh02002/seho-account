import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useLogin } from "../../context/loginContext";
import { selectMenuType } from "../../types/type";
import { Link } from "react-router-dom";
import CalendarMonth from "../cards/CalendarMonth";
import { GetUserBookListApi } from "../../api/sehomallApi";
import TopNav from "./TopNav";

const Header = () => {
  const { isLogin } = useLogin();
  const { myBooks, setMyBooks } = useLogin();
  const { setSelectMenu } = useLogin();

  useEffect(() => {
    GetUserBookListApi()
      .then((res) => {
        console.log(res);
        setMyBooks(res?.data?.content ?? []);

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
  }, [setMyBooks]);

  const myBooksMenu: selectMenuType[] = useMemo(
    () =>
      (myBooks ?? []).map((book) => ({
        value: book.id.toString(),
        label: book.name,
      })),
    [myBooks]
  );

  useEffect(() => {
    setSelectMenu(myBooksMenu[0]);
  }, [myBooksMenu, setSelectMenu]);

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
              <Link to={"/logout"}>로그아웃</Link>
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

const StyledUserInfo = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;

  a {
    text-decoration: none;
  }
`;
