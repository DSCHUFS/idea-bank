import React, { useCallback, useState } from "react";
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

export default function IdeaPage({ location }) {
  if (location.state === undefined) {
    return (
      <IdeaPageRoot>
        <h1>Idea Page</h1>
      </IdeaPageRoot>
    );
  }
  return (
    <IdeaPageRoot>
      <h1>Idea Page</h1>
      <h1>제목: {location.state.title}</h1>
      <h2>가격 : {location.state.price} KRW</h2>

      <Link to="/">👉 Back to home</Link>
    </IdeaPageRoot>
  );
}
