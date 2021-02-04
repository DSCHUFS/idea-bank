import styled from "styled-components";
import DrawCard from "../components/DrawCard";

const DrawPageRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;

  @media only screen and (min-width: 1500px) {
    justify-content: center;
  }
`;

export default function DrawPage() {
  return (
    <DrawPageRoot>
      <DrawCard
        text="아이디어1"
        link="idea"
        color="#86E14B"
        title="아이디어 뱅크 만들기 "
        price="1000"
        category="개발"
      />
      <DrawCard
        text="아이디어1"
        link="idea"
        color="#86E14B"
        title="아이디어 뱅크 만들기 "
        price="1000"
        category="개발"
      />
      <DrawCard
        text="아이디어1"
        link="idea"
        color="#86E14B"
        title="아이디어 뱅크 만들기 "
        price="1000"
        category="개발"
      />
      <DrawCard
        text="아이디어1"
        link="idea"
        color="#86E14B"
        title="아이디어 뱅크 만들기 "
        price="1000"
        category="개발"
      />
      <DrawCard
        text="아이디어1"
        link="idea"
        color="#86E14B"
        title="아이디어 뱅크 만들기 "
        price="1000"
        category="개발"
      />
    </DrawPageRoot>
  );
}
