import React from "react";
import Layout from "../../components/layouts/Layout";
import PieAccountChart from "../../components/cards/statics/PieAccountChart";
import styled from "styled-components";

const StaticsPage = () => {
  return (
    <Layout>
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
