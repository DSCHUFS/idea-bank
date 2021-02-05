import { Button } from "@material-ui/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../api/contextAPI";
import DrawCard from "../components/DrawCard";
import axios from "axios";

const DrawPageRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;

  @media only screen and (min-width: 1500px) {
    justify-content: center;
  }
`;

const Title = styled.div`
  position: absolute;
  font-size: 2rem;
  left: 30px;
  top: 30px;
`;

const FreePick = styled.div`
  position: absolute;
  font-size: 1.3rem;
  left: 30px;
  top: 70px;
`;

const Scroll = styled.div`
  position: absolute;
  font-size: 1.3rem;
  left: 30px;
  top: 100px;

  @media only screen and (min-width: 1000px) {
    display: none;
  }
`;

const BackHome = styled.div`
  position: absolute;
  left: 30px;
  bottom: 30px;
`;

export default function DrawPage() {
  const authContext = useContext(AuthContext);
  const { info, setInfo } = authContext;
  useEffect(() => {
    authContext.getProfile();
  }, []);

  useEffect(() => {}, [info]);

  const handleReducePoint = useCallback(() => {
    console.log(info);
    if (info !== undefined && info.free > 0)
      setInfo({
        ...info,
        free: info.free - 1,
      });
  }, [info]);

  return (
    <DrawPageRoot>
      <Title>카테고리 선택</Title>
      <FreePick>
        {info !== undefined && info.free > 0
          ? `무료뽑기 ${info.free}회 남음`
          : "뽑기 회당 100포인트 차감"}
      </FreePick>
      <Scroll>스크롤 하시면 됩니다 ➡</Scroll>
      <BackHome>
        <Button variant="contained">
          <Link to="/">👉 Back to home</Link>
        </Button>
      </BackHome>
      <DrawCard
        text="유튜브 아이디어"
        color="#ffbab5"
        category="youtube"
        handleReducePoint={handleReducePoint}
      />
      <DrawCard
        text="개발 아이디어"
        color="#86E14B"
        category="programming"
        handleReducePoint={handleReducePoint}
      />
      <DrawCard
        text="기타 아이디어"
        color="#e3d7b6"
        category="etc"
        handleReducePoint={handleReducePoint}
      />
    </DrawPageRoot>
  );
}
