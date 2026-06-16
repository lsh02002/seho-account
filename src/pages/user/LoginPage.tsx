import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const OnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");
    setEmail(e.target.value);
  };

  const OnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");
    setPassword(e.target.value);
  };

  const OnLogin = () => {};

  return (
    <Layout>
      <div
        className="bg-white d-flex justify-content-center align-items-center flex-column p-4 mt-5"
        style={{
          width: "360px",
          boxSizing: "border-box",
        }}
      >
        <h2 className="fw-normal mb-3" style={{ margin: "5px" }}>
          LOGIN
        </h2>

        <div className="w-100">
          <div style={{ fontSize: "14px" }}>이메일</div>

          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => OnEmailChange(e)}
          />
        </div>

        <div className="w-100 pt-3">
          <div style={{ fontSize: "14px" }}>패스워드</div>

          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => OnPasswordChange(e)}
          />
        </div>

        {errMessage && <span className="text-danger pt-3">{errMessage}</span>}

        <button className="btn btn-secondary w-100 mt-4" onClick={OnLogin}>
          로그인
        </button>
      </div>
    </Layout>
  );
};

export default LoginPage;
