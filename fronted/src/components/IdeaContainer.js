import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../api/contextAPI";
import { Redirect } from "react-router";

const IdeaContainerRoot = styled.div`
  position: relative;
  width: 100%;
`;

const PurchaseButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: yellowgreen;
  }
`;

export default function IdeaContainer({ id, title, detail, price }) {
  const authContext = useContext(AuthContext);
  const { info } = authContext;
  const [buy, setBuy] = useState(false);
  const [ideaInfo, setIdeaInfo] = useState();

  const handlePurchase = () => {
    console.log(authContext);
    if (price > info.basic.user_point) {
      alert("포인트가 모자랍니다.");
      return;
    }
    if (window.confirm(`${price}포인트를 사용하여 구입하시겠습니까?`)) {
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
          console.log(response.data);
          setBuy(true);
          setIdeaInfo(response.data.idea_info);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  if (buy && ideaInfo !== undefined) {
    console.log(ideaInfo);
    return (
      <Redirect
        to={{
          pathname: "/idea",
          state: {
            title: ideaInfo.idea_title,
            detail: ideaInfo.idea_detail,
            price: ideaInfo.idea_price,
            user_nickname: ideaInfo.user_nickname,
          },
        }}
      />
    );
  }

  return (
    <IdeaContainerRoot>
      <hr />
      <div>Title: {title}</div>
      {detail !== undefined ? <div>Detail: {detail}</div> : null}
      <div>Price: {price}</div>
      {detail !== undefined ? null : (
        <PurchaseButton onClick={handlePurchase}>👉 구입하기</PurchaseButton>
      )}
      <hr />
    </IdeaContainerRoot>
  );
}
