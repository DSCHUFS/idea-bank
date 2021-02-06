import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../api/contextAPI";
import axios from "axios";

const RegisterPageRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
`;

export default function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const authContext = useContext(AuthContext);
  const titleRef = useRef();
  const detailRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  const handleSubmit = () => {
    console.log(`Title: ${titleRef.current.value}`);
    console.log(`Detail: ${detailRef.current.value}`);
    console.log(`Price: ${priceRef.current.value}`);
    console.log(`Category: ${categoryRef.current.value}`);

    if (titleRef.current.value === "") {
      alert("타이틀 입력해주세요.");
      return;
    } else if (detailRef.current.value === "") {
      alert("세부사항을 입력해주세요.");
      return;
    } else if (priceRef.current.value === "") {
      alert("가격을 입력해주세요.");
      return;
    } else if (categoryRef.current.value === "") {
      alert("카테고리를 입력해주세요.");
      return;
    }

    var data = JSON.stringify({
      title: titleRef.current.value,
      detail: detailRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
    });

    var config = {
      method: "post",
      url: "/api/idea/register/",
      headers: {
        "Content-Type": "application/json",
        authorization: authContext.token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setIsRegistered(true);
        alert("아이디어가 등록되었습니다.");
      })
      .catch(function (error) {
        console.log(error);
        alert("등록에 실패했습니다.");
      });
  };

  if (!authContext.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (isRegistered) {
    return <Redirect to="/" />;
  }

  return (
    <RegisterPageRoot>
      <h1>아이디어 등록</h1>

      <Paper style={{ padding: "30px" }}>
        <div>
          <TextField
            inputRef={titleRef}
            id="outlined-textarea"
            label="타이틀"
            placeholder="ex) 아이디어 뱅크 만들기"
            variant="outlined"
          />
        </div>
        <br />
        <div>
          <TextField
            inputRef={detailRef}
            id="outlined-textarea"
            label="자세한 정보"
            placeholder="ex) 아이디어 뱅크는..."
            multiline
            variant="outlined"
          />
        </div>
        <br />
        <div>
          <TextField
            inputRef={priceRef}
            id="outlined-textarea"
            label="가격(원)"
            placeholder="ex) 1000"
            variant="outlined"
          />
        </div>
        <br />

        {/* <div>
          <TextField
            inputRef={categoryRef}
            id="outlined-textarea"
            label="카테고리"
            placeholder="ex) 해커톤 아이디어"
            variant="outlined"
          />
        </div> */}
        <FormControl variant="outlined" style={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-outlined-label">
            카테고리
          </InputLabel>
          <Select
            inputRef={categoryRef}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="category"
          >
            <MenuItem value={"youtube"}>Youtube</MenuItem>
            <MenuItem value={"programming"}>Programming</MenuItem>
            <MenuItem value={"etc"}>etc</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Button onClick={handleSubmit} variant="contained">
          등록하기
        </Button>
      </Paper>
      <br />
      <Link to="/">👉 Back to home</Link>
    </RegisterPageRoot>
  );
}
