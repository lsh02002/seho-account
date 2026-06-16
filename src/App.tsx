import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import DayAccountPage from "./pages/account/DayAccountPage";
import MonthAccountPage from "./pages/account/MonthAccountPage";
import CalendarAccountPage from "./pages/account/CalendarAccountPage";
import MemoPage from "./pages/account/MemoPage";
import SummaryPage from "./pages/account/SummaryPage";
import StaticsPage from "./pages/statics/StaticsPage";
import AboutPage from "./pages/about/AboutPage";
import BottomNav from "./components/layouts/BottomNav";

import { useLogin } from "./context/loginContext";
import { layout } from "./theme/theme";

function App() {
  const { setIsLogin } = useLogin();

  useEffect(() => {
    setIsLogin(true);
  }, [setIsLogin]);

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div
        className="d-flex justify-content-center align-items-center flex-column w-100"
        style={{
          maxWidth: layout.maxWidth,
        }}
      >
        <Routes>
          <Route path="/" element={<DayAccountPage />} />
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
        <Analytics />
      </div>
    </div>
  );
}

export default App;
