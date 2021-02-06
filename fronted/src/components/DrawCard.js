import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import IdeaCard from "./IdeaCard";
import axios from "axios";
import { AuthContext } from "../api/contextAPI";
import { Link } from "react-router-dom";

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

const RegisterLink = styled.div`
  color: inherit;
  transition: 0.3s;

  &:hover {
    color: red;
    font-weight: bold;
  }
`;

export default function DrawCard({ text, category, color, handleReducePoint }) {
  const authContext = useContext(AuthContext);
  const { info } = authContext;
  const [state, setState] = useState(false);
  const [idea, setIdea] = useState(null);

  const getRandomIdea = useCallback(() => {
    const config = {
      method: "get",
      url: `/api/idea/${category}`,
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

  const handleOnClick = useCallback(() => {
    if (info.basic.user_point > 100) {
      setState(true);
      if (!state) {
        getRandomIdea();
        handleReducePoint();
      }
    } else {
      alert("포인트가 모자랍니다");
    }
  }, [state, getRandomIdea, handleReducePoint]);

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
        ) : (
          <div>
            <div>더 이상 아이디어가 존재하지 않습니다</div>
            <br />
            <Link to="/register">
              <RegisterLink>👉 아이디어 만들기!</RegisterLink>
            </Link>
          </div>
        )
      ) : (
        text
      )}
    </DrawCardRoot>
  );
}
