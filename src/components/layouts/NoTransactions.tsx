import React from "react";
import styled from "styled-components";
import Layout from "./Layout";
import LostItems from "../../assets/lost-items.svg";

const NoTransactions = () => {

  return (
    <Layout>
      <Container>
        <NoItemImage src={LostItems} />
        <NoItemText>해당 기입 내역이 없습니다.</NoItemText>
      </Container>
    </Layout>
  );
};

export default NoTransactions;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
`;

const NoItemImage = styled.img`
  width: 50px;
`;

const NoItemText = styled.div`
  margin-top: 20px;
`;
