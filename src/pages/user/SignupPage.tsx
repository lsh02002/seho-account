import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";

const SignupPage = () => {
  const [state, setState] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const [errMessage, setErrMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const OnFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const OnSignup = () => {
    // const data: userSignupType = {
    //   email: state.email,
    //   password: state.password,
    //   passwordConfirm: state.passwordConfirm,
    //   nickname: state.nickname,
    // };
    // UserSignupApi(data)
    //   .then((res) => {
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     if (err?.response?.data?.detailMessage) {
    //       setErrMessage(err.response.data.detailMessage);
    //     } else {
    //         setErrMessage(err?.message);
    //     }
    //   });
  };

  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center flex-column border p-4 mt-5"
        style={{
          width: "360px",
          boxSizing: "border-box",
        }}
      >
        <h2 className="fw-normal mb-3" style={{ margin: "5px" }}>
          SIGNUP
        </h2>

        <div className="w-100 pb-2">
          <div style={{ fontSize: "14px" }}>이메일</div>

          <input
            className="form-control"
            type="email"
            name="email"
            value={state.email}
            onChange={OnFieldChange}
          />
        </div>

        <div className="w-100 pb-2">
          <div style={{ fontSize: "14px" }}>
            닉네임 (영문자로 시작하고 영문자 숫자 조합)
          </div>

          <input
            className="form-control"
            type="text"
            name="nickname"
            value={state.nickname}
            onChange={OnFieldChange}
          />
        </div>

        <div className="w-100 pb-2">
          <div style={{ fontSize: "14px" }}>
            패스워드 (입력형식: 간단히 영문 대소문자와 숫자 조합)
          </div>

          <input
            className="form-control"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={state.password}
            onChange={OnFieldChange}
          />
        </div>

        <div className="w-100 pb-2">
          <div style={{ fontSize: "14px" }}>패스워드 확인</div>

          <input
            className="form-control"
            type={isPasswordVisible ? "text" : "password"}
            name="passwordConfirm"
            value={state.passwordConfirm}
            onChange={OnFieldChange}
          />
        </div>

        <div className="w-100 text-end pb-2">
          <label
            className="d-inline-flex align-items-center gap-2"
            style={{
              fontSize: "14px",
            }}
          >
            비밀번호 보이기
            <input
              type="checkbox"
              checked={isPasswordVisible}
              onChange={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </label>
        </div>

        {errMessage && <span className="text-danger pt-3">{errMessage}</span>}

        <button className="btn btn-secondary w-100 mt-4" onClick={OnSignup}>
          회원가입
        </button>
      </div>
    </Layout>
  );
};

export default SignupPage;
