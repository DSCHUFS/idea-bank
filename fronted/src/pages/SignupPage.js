import { Button, Paper, TextField } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../api/contextAPI";

const SignupPageRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
`;

const InvalidPassword = styled.div`
  color: red;
`;

const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

export default function SignupPage() {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isKorean, setIsKorean] = useState(false);

  const authContext = useContext(AuthContext);

  const emailRef = useRef();
  const nicknameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleKeyDownEmail = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      nicknameRef.current.focus();
    }
  };

  const handleKeyDownNickname = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  const handleKeyDownPassword = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      confirmPasswordRef.current.focus();
    }
    setIsValidPassword(
      confirmPasswordRef.current.value === passwordRef.current.value
    );
  };

  const handleOnChangePassword = (e) => {
    if (korean.test(e.target.value)) {
      setIsKorean(true);
    } else {
      setIsKorean(false);
    }
    setIsValidPassword(confirmPasswordRef.current.value === e.target.value);
  };

  const handleOnChangeConfirmPassword = (e) => {
    if (korean.test(e.target.value)) {
      setIsKorean(true);
    } else {
      setIsKorean(false);
    }
    setIsValidPassword(passwordRef.current.value === e.target.value);
  };

  const handleSubmit = () => {
    console.log(`Email: ${emailRef.current.value}`);
    console.log(`Nickname: ${nicknameRef.current.value}`);
    console.log(`Password: ${passwordRef.current.value}`);

    var data = JSON.stringify({
      email: emailRef.current.value,
      nickname: nicknameRef.current.value,
      password: passwordRef.current.value,
    });

    var config = {
      method: "post",
      url: "/api/auth/signup/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        alert("회원가입 되었습니다.");
        authContext.setIsAuthenticated(true);
        authContext.setToken(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
        alert("회원가입에 실패했습니다.");
      });
  };

  if (authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <SignupPageRoot>
      <h1>회원가입</h1>
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
            id="nickname"
            label="Nickname"
            inputRef={nicknameRef}
            placeholder="닉네임"
            variant="outlined"
            autoComplete="off"
            onKeyDown={handleKeyDownNickname}
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
            onChange={handleOnChangePassword}
            onKeyDown={handleKeyDownPassword}
          />
        </div>
        <br />

        <div>
          <TextField
            id="password confirm"
            label="비밀번호 확인"
            inputRef={confirmPasswordRef}
            type="password"
            variant="outlined"
            autoComplete="off"
            pattern="^([a-z0-9_]){4,50}$"
            title="4자 이상 입력해주세요. 영어와 숫자를 포합해야 합니다."
            onChange={handleOnChangeConfirmPassword}
          />
        </div>
        <InvalidPassword>
          {isValidPassword ? null : "비밀번호가 일치하지 않습니다."}
        </InvalidPassword>
        <InvalidPassword>
          {isKorean ? (
            <div>
              비밀번호에 한글이 포함되었습니다.
              <br />
              영문으로 입력해주세요.
            </div>
          ) : null}
        </InvalidPassword>
        <br />
        <div>
          <Button
            variant={isKorean || !isValidPassword ? "disabled" : "contained"}
            onClick={isKorean || !isValidPassword ? null : handleSubmit}
          >
            가입하기
          </Button>
        </div>
      </Paper>
      <br />
      <Link to="/">👉 Back to home</Link>
    </SignupPageRoot>
  );
}
