import { Button, Paper, TextField } from "@material-ui/core";
import { useContext, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../api/contextAPI";

const LoginPageRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
`;

const RegisterLink = styled.div`
  color: inherit;
  transition: 0.3s;

  &:hover {
    color: red;
    font-weight: bold;
  }
`;

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleKeyDownEmail = (e) => {
    if (e.keyCode === 13) {
      passwordRef.current.focus();
    }
  };

  const handleKeyDownPassword = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // console.log(`Email: ${emailRef.current.value}`);
    // console.log(`Password: ${passwordRef.current.value}`);

    var data = JSON.stringify({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    var config = {
      method: "post",
      url: "/api/auth/signin/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.token);
        sessionStorage.setItem("isAuth", true);
        sessionStorage.setItem("token", response.data.token);
        authContext.setIsAuthenticated(true);
        authContext.setToken(response.data.token);
      })
      .catch(function (error) {
        // console.log(error);
        alert("로그인에 실패했습니다.");
      });
  };

  if (authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <LoginPageRoot>
      <h1>로그인</h1>
      <Paper style={{ padding: "20px" }}>
        <div>
          <TextField
            id="email"
            label="Email"
            inputRef={emailRef}
            placeholder="abc@google.com"
            variant="outlined"
            autoComplete="off"
            onKeyDown={handleKeyDownEmail}
          />
        </div>
        <br />

        <div>
          <TextField
            id="password"
            label="비밀번호"
            inputRef={passwordRef}
            type="password"
            variant="outlined"
            autoComplete="off"
            pattern="^([a-z0-9_]){4,50}$"
            title="4자 이상 입력해주세요. 영어와 숫자를 포합해야 합니다."
            onKeyDown={handleKeyDownPassword}
          />
        </div>
        <br />
        <div>
          <Button variant="contained" onClick={handleSubmit}>
            로그인
          </Button>
        </div>
        <br />
        <Link to="/signup">
          <RegisterLink>👉 가입하러가기</RegisterLink>
        </Link>
      </Paper>
    </LoginPageRoot>
  );
}
