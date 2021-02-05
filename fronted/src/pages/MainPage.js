import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../api/contextAPI";
import MenuCard from "../components/MenuCard";

const MainPageRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;

  @media only screen and (min-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.div`
  position: fixed;
  font-size: 2.5rem;
  top: 30px;
  left: calc(50vw - 9rem);
`;

export default function MainPage() {
  const authContext = useContext(AuthContext);
  return (
    <>
      <MainPageRoot>
        <Title>💡아이디어 뱅크💡</Title>
        <MenuCard text="아이디어 뽑기" link="draw" color="#F8E84B" />
        <MenuCard
          text="아이디어 넣어두기"
          detail="300포인트 획득 가능"
          link="register"
          color="#86E14B"
        />
        {authContext.isAuthenticated ? (
          <MenuCard text="마이페이지" link="mypage" color="#c5bfff" />
        ) : (
          <MenuCard text="로그인 하러 가기" link="login" color="#c5bfff" />
        )}
      </MainPageRoot>
    </>
  );
}
