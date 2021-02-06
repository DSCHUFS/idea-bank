import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export default function NotFound(props) {
  // console.log(props);
  return (
    <NotFoundRoot>
      <h1>Not Found</h1>
      <Link to="/">👉 Back to home</Link>
      <div>
        {props.location.state !== undefined ? props.location.state.title : null}
      </div>
    </NotFoundRoot>
  );
}
