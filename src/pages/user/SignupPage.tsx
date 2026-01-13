import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import styled from "styled-components";

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
    //     // console.log(res);
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
      <Main>
        <Title>SIGNUP</Title>
        <Email>
          <div>이메일</div>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={OnFieldChange}
          />
        </Email>
        <Text>
          <div>닉네임 (영문자로 시작하고 영문자 숫자 조합)</div>
          <input
            type="text"
            name="nickname"
            value={state.nickname}
            onChange={OnFieldChange}
          />
        </Text>
        <Password>
          <div>패스워드 (입력형식: 간단히 영문 대소문자와 숫자 조합)</div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={state.password}
            onChange={OnFieldChange}
          />
        </Password>
        <Password>
          <div>패스워드 확인</div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="passwordConfirm"
            value={state.passwordConfirm}
            onChange={OnFieldChange}
          />
        </Password>
        <Check>
          <label>
            비밀번호 보이기
            <input
              type="checkbox"
              checked={isPasswordVisible}
              onChange={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </label>
        </Check>
        {errMessage && <Error>{errMessage}</Error>}
        <SignUp onClick={OnSignup}>회원가입</SignUp>
      </Main>
    </Layout>
  );
};

export default SignupPage;

const Main = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 360px;
  border: 1px solid lightgray;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-weight: normal;
  margin: 5px;
`;

const Email = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  div {
    font-size: 14px;
  }
  input[type="email"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Text = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  div {
    font-size: 14px;
  }
  input[type="text"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Password = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  div {
    font-size: 14px;
  }
  input[type="text"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
  input[type="password"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Check = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  text-align: right;
  label {
    display: inline-block;
    width: 40%;
    font-size: 14px;
  }
  input[type="checkbox"] {
    width: 10%;
    padding: 5px;
    outline: none;
  }
`;

const SignUp = styled.button`
  margin-top: 20px;
  width: 100%;
  border: none;
  padding: 10px;
  background-color: gray;
  cursor: pointer;
  color: white;
  transition: 0.2s;
  &:hover {
    background-color: lightgray;
  }
`;

const Error = styled.span`
  color: red;
  padding: 20px 0 0 0;
`;
