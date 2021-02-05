import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuCardRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
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

const Detail = styled.div`
  font-size: 1.3rem;
`;

export default function MenuCard({ text, detail, link, color }) {
  return (
    <Link to={`/${link}`} style={{ textDecoration: "none", color: "black" }}>
      <MenuCardRoot color={color}>
        {text}
        <Detail>{detail}</Detail>
      </MenuCardRoot>
    </Link>
  );
}
