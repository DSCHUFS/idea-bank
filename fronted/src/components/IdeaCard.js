import { Link } from "react-router-dom";
import styled from "styled-components";

const IdeaCardRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const DetailLink = styled.div`
  color: inherit;
  transition: 0.3s;

  &:hover {
    color: red;
    font-weight: bold;
  }
`;

export default function IdeaCard({ title, price, category }) {
  return (
    <IdeaCardRoot>
      <h2>{title}</h2>
      <h3>가격: {price}KRW</h3>
      <div>{category}</div>
      <br />
      <Link
        to={{
          pathname: `/idea`,
          state: {
            title,
            price,
            category,
          },
        }}
      >
        <DetailLink>👉 자세히 보기</DetailLink>
      </Link>
    </IdeaCardRoot>
  );
}
