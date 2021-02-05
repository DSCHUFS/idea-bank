import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import IdeaCard from "./IdeaCard";
import axios from "axios";
import { AuthContext } from "../api/contextAPI";

const DrawCardRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 20px;
  min-width: 300px;
  height: 480px;
  font-size: 2rem;
  background-image: ${(props) =>
    props.color === undefined
      ? "linear-gradient(#ffffff, #adffc3)"
      : `linear-gradient( #ffffff, ${props.color})`};
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    margin-bottom: 30px;
    box-shadow: 8px 8px 1px 1px rgba(0, 0, 0, 0.2);
  }
`;

export default function DrawCard({ text, category, color, handleReducePoint }) {
  const [state, setState] = useState(false);
  const [idea, setIdea] = useState(null);
  const authContext = useContext(AuthContext);

  const handleOnClick = useCallback(() => {
    setState(true);
    getRandomIdea();
    handleReducePoint();
  }, []);

  const getRandomIdea = useCallback(() => {
    const config = {
      method: "get",
      url: `/idea/${category}`,
      headers: {
        authorization: authContext.token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setIdea(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <DrawCardRoot onClick={handleOnClick} color={state ? "#adffc3" : color}>
      {state ? (
        idea !== null ? (
          <IdeaCard
            id={idea.idea_id}
            title={idea.idea_title}
            price={idea.idea_price}
            author={idea.user_nickname}
            category={category}
          />
        ) : null
      ) : (
        text
      )}
    </DrawCardRoot>
  );
}
