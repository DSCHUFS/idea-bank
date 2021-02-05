import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { AuthContext } from "../api/contextAPI";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import IdeaContainer from "../components/IdeaContainer";

const MyPageRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  overflow-y: auto;
`;

const InfoDiv = styled.div`
  width: 600px;
  font-size: 1.2rem;

  @media only screen and (max-width: 1000px) {
    width: 300px;
  }
`;

const IdeaListContainer = styled.div`
  width: 80%;
  padding: 30px;
`;

export default function MyPage() {
  const authContext = useContext(AuthContext);
  const [info, setInfo] = useState();

  useEffect(() => {
    var config = {
      method: "get",
      url: "/mypage/",
      headers: {
        authorization: authContext.token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setInfo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleOnClickLogout = () => {
    authContext.logout();
  };

  if (!authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (info === undefined) {
    return (
      <MyPageRoot>
        <h1>My Page</h1>
        <Link to="/">👉 Back to home</Link>
      </MyPageRoot>
    );
  }

  return (
    <MyPageRoot>
      <h1>My Page</h1>
      <Link to="/">👉 Back to home</Link>
      <InfoDiv>
        <hr />
        <div>Email: {info.basic.user_email}</div>
        <div>NickName: {info.basic.user_nickname}</div>
        <div>평점: {info.basic.user_grade}</div>
        <div>남은 포인트: {info.basic.user_point}</div>
        <hr />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            뽑은 아이디어 ({info.pick.length}개)
          </AccordionSummary>
          <IdeaListContainer>
            {info.pick.map((e) => {
              return (
                <IdeaContainer
                  id={e.idea_id}
                  title={e.idea_title}
                  detail={e.idea_detail}
                  price={e.idea_price}
                />
              );
            })}
          </IdeaListContainer>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            구입한 아이디어 ({info.buy.length}개)
          </AccordionSummary>
          <IdeaListContainer>
            {info.buy.map((e) => {
              return (
                <IdeaContainer
                  id={e.idea_id}
                  title={e.idea_title}
                  detail={e.idea_detail}
                  price={e.idea_price}
                />
              );
            })}
          </IdeaListContainer>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            등록한 아이디어 ({info.register.length}개)
          </AccordionSummary>
          <IdeaListContainer>
            {info.register.map((e) => {
              return (
                <IdeaContainer
                  id={e.idea_id}
                  title={e.idea_title}
                  detail={e.idea_detail}
                  price={e.idea_price}
                />
              );
            })}
          </IdeaListContainer>
        </Accordion>
        <br />
        <Button variant="outlined" onClick={handleOnClickLogout}>
          로그아웃
        </Button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </InfoDiv>
    </MyPageRoot>
  );
}
