import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuCardRoot = styled.div`
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
    box-shadow: 8px 8px 1px 1px rgba(0, 0, 0, 0.2);
  }
`;

export default function MenuCard({ text, link, color }) {
  return (
    <Link to={`/${link}`} style={{ textDecoration: "none", color: "black" }}>
      <MenuCardRoot color={color}>{text}</MenuCardRoot>
    </Link>
  );
}
