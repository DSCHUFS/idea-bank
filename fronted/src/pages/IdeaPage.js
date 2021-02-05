import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const IdeaPageRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const IdeaDetail = styled.div`
  width: 600px;
  font-size: 1.2rem;

  @media only screen and (max-width: 1000px) {
    text-align: center;
    width: 300px;
  }
`;

export default function IdeaPage({ location }) {
  if (location.state === undefined) {
    return (
      <IdeaPageRoot>
        <h1>Idea Page</h1>
        <Link to="/">👉 Back to home</Link>
      </IdeaPageRoot>
    );
  }
  return (
    <IdeaPageRoot>
      <h2>제목: {location.state.title}</h2>
      <h4>작가 : {location.state.user_nickname}</h4>
      <h4>가격 : {location.state.price} 포인트</h4>

      <h3>세부사항</h3>
      <IdeaDetail>{location.state.detail}</IdeaDetail>

      <br />
      <Link to="/">👉 Back to home</Link>
    </IdeaPageRoot>
  );
}
