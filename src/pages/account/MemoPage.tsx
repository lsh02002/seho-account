import React from "react";
import Layout from "../../components/layouts/Layout";
import styled from "styled-components";

const MemoPage = () => {
  return (
    <Layout isTopNav={true}>
      <Container>메모 페이지입니다.</Container>
    </Layout>
  );
};

export default MemoPage;

const Container = styled.div`
  margin-top: 100px;
`;
