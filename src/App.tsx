import React, { useEffect } from "react";
import LoginPage from "./pages/user/LoginPage";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "./components/layouts/BottomNav";
import DayAccountPage from "./pages/account/DayAccountPage";
import AboutPage from "./pages/about/AboutPage";
import SignupPage from "./pages/signup/SignupPage";
import { useLogin } from "./context/loginContext";
import { GetUserBookListApi } from "./api/sehomallApi";
import AddTransPage from "./pages/account/AddTransPage";
import ModifyTransPage from "./pages/account/ModifyTransPage";
import MonthAccountPage from "./pages/account/MonthAccountPage";
import CalendarAccountPage from "./pages/account/CalendarAccountPage";
import MemoPage from "./pages/account/MemoPage";
import SummaryPage from "./pages/account/SummaryPage";

function App() {
  const { setIsLogin, setMyBooks } = useLogin();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLogin(true);
    }
  }, [setIsLogin]);

  useEffect(() => {
    GetUserBookListApi()
      .then((res) => {
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

  return (
    <Container>
      <Wrapper>
        <Routes>
          <Route path="/" element={<DayAccountPage />} />
          <Route path="/add-transaction" element={<AddTransPage />} />
          <Route
            path="/modify-transaction/:bookId/:transactionId"
            element={<ModifyTransPage />}
          />
          <Route path="/calendar" element={<CalendarAccountPage />} />
          <Route path="/month" element={<MonthAccountPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/memo" element={<MemoPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<div>페이지가 존재하지 않습니다.</div>} />
        </Routes>
        <BottomNav />
      </Wrapper>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
`;
