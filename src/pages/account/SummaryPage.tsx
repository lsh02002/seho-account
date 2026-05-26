import React from "react";

import Layout from "../../components/layouts/Layout";

const SummaryPage = () => {
  return (
    <Layout isTopNav={true}>
      <div
        className="w-100"
        style={{
          marginTop: "100px",
        }}
      >
        결산 페이지입니다.
      </div>
    </Layout>
  );
};

export default SummaryPage;
