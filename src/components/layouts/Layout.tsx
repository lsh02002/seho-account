import React from "react";
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
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{
        paddingBottom: "100px",
      }}
    >
      {isTopNav && <Header />}

      <div
        className="d-flex justify-content-center align-items-center w-100 mx-3"
        style={isTopNav ? { paddingTop: "80px" } : {}}
      >
        {children}
      </div>

      {isTopNav && (
        <button
          onClick={() => navigator("/add-transaction")}
          className="btn position-fixed rounded-circle"
          style={{
            width: "60px",
            height: "60px",
            right: "10px",
            bottom: "80px",
            zIndex: 200,
            backgroundColor: "lightblue",
            border: "none",
            fontSize: "25px",
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

export default Layout;
