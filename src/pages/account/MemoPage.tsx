import React from "react";

import Layout from "../../components/layouts/Layout";

const MemoPage = () => {
  return (
    <Layout isTopNav={true}>
      <div
        className="w-100"
        style={{
          marginTop: "100px",
        }}
      >
        메모 페이지입니다.
      </div>
    </Layout>
  );
};

export default MemoPage;
