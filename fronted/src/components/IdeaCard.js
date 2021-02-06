import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../api/contextAPI";

const IdeaCardRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const DetailLink = styled.div`
  color: inherit;
  font-size: 1.2rem;
  transition: 0.3s;

  &:hover {
    color: red;
    font-weight: bold;
  }
`;

export default function IdeaCard({ id, title, price, author, category }) {
  const authContext = useContext(AuthContext);
  const { info } = authContext;
  const [buy, setBuy] = useState(false);
  const [ideaInfo, setIdeaInfo] = useState();

  const handlePurchase = (e) => {
    e.preventDefault();
    // console.log(info);
    if (price > info.basic.user_point) {
      alert("포인트가 모자랍니다.");
      return;
    }
    if (window.confirm(`${price}포인트를 사용하여 구입하시겠습니까?`)) {
      // console.log(id);
      var data = JSON.stringify({
        idea_id: id,
      });

      var config = {
        method: "post",
        url: "/api/idea/buy/",
        headers: {
          "Content-Type": "application/json",
          authorization: authContext.token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          // console.log(response.data);
          setBuy(true);
          setIdeaInfo(response.data.idea_info);
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  };

  if (buy && ideaInfo !== undefined) {
    // console.log("redirect to idea");
    return (
      <Redirect
        to={{
          pathname: "/idea",
          state: {
            id: ideaInfo.idea_id,
            title: ideaInfo.idea_title,
            price: ideaInfo.idea_price,
            detail: ideaInfo.idea_detail,
            user_nickname: ideaInfo.user_nickname,
          },
        }}
      />
    );
  }

  return (
    <IdeaCardRoot>
      <div>제목: {title}</div>
      <br />
      <div>작가: {author}</div>
      <div>가격: {price}포인트</div>
      <br />
      <DetailLink onClick={handlePurchase}>👉 구입해서 자세히 보기</DetailLink>
    </IdeaCardRoot>
  );
}
