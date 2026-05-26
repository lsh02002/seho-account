import React from "react";
import { useLogin } from "../../context/loginContext";
import { Link } from "react-router-dom";

import CalendarMonth from "../cards/accounts/CalendarMonth";
import TopNav from "./TopNav";

const Header = () => {
  const { isLogin } = useLogin();

  const handleLogout = () => {};

  return (
    <div
      className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 end-0 bg-white"
      style={{
        width: "100%",
        zIndex: 100,
      }}
    >
      <div className="d-flex justify-content-between align-items-center w-100 m-3">
        <CalendarMonth />

        <TopNav />

        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            width: "130px",
            fontSize: "0.9rem",
          }}
        >
          {!isLogin ? (
            <>
              <Link to="/login" className="text-decoration-none text-primary">
                로그인
              </Link>

              <Link to="/signup" className="text-decoration-none text-primary">
                회원가입
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="btn btn-link text-primary text-decoration-none p-0"
                style={{
                  fontSize: "0.9rem",
                }}
              >
                로그아웃
              </button>

              <Link to="/mypage" className="text-decoration-none text-primary">
                마이페이지
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
