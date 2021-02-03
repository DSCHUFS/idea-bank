import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function NotFound() {
  return (
    <NotFoundRoot>
      <h1>Not Found</h1>
      <Link to="/">👉 Back to home</Link>
    </NotFoundRoot>
  );
}
