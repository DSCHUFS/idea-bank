import React from "react";
import styled from "styled-components";
import MenuCard from "../components/MenuCard";

const MainPageRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100vw;
  height: 100vh;

  @media only screen and (min-width: 768px) {
    justify-content: center;
  }
`;

export default function MainPage() {
  return (
    <>
      <MainPageRoot>
        <MenuCard text="아이디어 넣어두기" link="make-idea" color="#86E14B" />
        <MenuCard text="아이디어 뽑기" link="draw" color="#F8E84B" />
        <MenuCard text="로그인 하러 가기" link="login" color="#3B8D47" />
      </MainPageRoot>
    </>
  );
}
