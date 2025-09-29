import React from "react";
import Layout from "../../components/layouts/Layout";
import styled from "styled-components";

const SummaryPage = () => {
  return (
    <Layout isTopNav={true}>
      <Container>결산 페이지입니다.</Container>
    </Layout>
  );
};

export default SummaryPage;

const Container = styled.div`
  margin-top: 100px;
`;
