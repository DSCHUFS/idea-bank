import React from "react";
import styled from "styled-components";
import DrawCard from "../components/DrawCard";

const MainPageRoot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

export default function MainPage() {
  return (
    <>
      <MainPageRoot>
        <DrawCard category="아이디어 넣어두기" color="#86E14B" />
        <DrawCard category="아이디어 뽑기" color="#F8E84B" />
        <DrawCard category="로그인 하러 가기" color="#3B8D47" />
      </MainPageRoot>
    </>
  );
}
