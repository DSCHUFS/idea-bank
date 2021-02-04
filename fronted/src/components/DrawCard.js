import React, { useCallback, useState } from "react";
import styled from "styled-components";
import IdeaCard from "./IdeaCard";

const DrawCardRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 20px;
  min-width: 300px;
  height: 480px;
  background-color: ${(props) =>
    props.color === undefined ? "#adffc3" : props.color};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    margin-bottom: 30px;
    box-shadow: 8px 8px 1px 1px rgba(0, 0, 0, 0.2);
  }
`;

export default function DrawCard({ text, title, price, category, color }) {
  const [state, setState] = useState(false);

  const handleOnClick = useCallback(() => {
    setState(!state);
  }, [state]);

  return (
    <DrawCardRoot onClick={handleOnClick} color={state ? "#adffc3" : color}>
      {state ? (
        <IdeaCard title={title} price={price} category={category} />
      ) : (
        text
      )}
    </DrawCardRoot>
  );
}
