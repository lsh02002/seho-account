import React, { useEffect } from "react";
import LoginPage from "./pages/user/LoginPage";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "./components/layouts/BottomNav";
import DayAccountPage from "./pages/account/DayAccountPage";
import AboutPage from "./pages/about/AboutPage";
import SignupPage from "./pages/user/SignupPage";
import { useLogin } from "./context/loginContext";
import AddTransPage from "./pages/account/AddTransPage";
import ModifyTransPage from "./pages/account/ModifyTransPage";
import MonthAccountPage from "./pages/account/MonthAccountPage";
import CalendarAccountPage from "./pages/account/CalendarAccountPage";
import MemoPage from "./pages/account/MemoPage";
import SummaryPage from "./pages/account/SummaryPage";
import StaticsPage from "./pages/statics/StaticsPage";

function App() {
  const { setIsLogin } = useLogin();

  useEffect(() => {
      setIsLogin(true);
  }, [setIsLogin]);

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
          <Route path="/statics" element={<StaticsPage />} />
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
