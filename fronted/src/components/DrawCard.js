import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DrawCardRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 300px;
  height: 480px;
  background-color: ${(props) =>
    props.color === undefined ? "#adffc3" : props.color};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    margin-bottom: 30px;
  }
`;

export default function DrawCard({ category, color }) {
  return (
    <Link to="/result">
      <DrawCardRoot color={color}>{category}</DrawCardRoot>
    </Link>
  );
}
