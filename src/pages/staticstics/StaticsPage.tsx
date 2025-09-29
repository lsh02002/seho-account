import React from "react";
import Layout from "../../components/layouts/Layout";
import PieAccountChart from "../../components/cards/statistics/PieAccountChart";
import styled from "styled-components";

const StaticsPage = () => {
  return (
    <Layout isTopNav={true}>
      <Container>
        <PieAccountChart />
      </Container>
    </Layout>
  );
};

export default StaticsPage;

const Container = styled.div`
  width: 100%;
  margin-top: 70px;
`;
