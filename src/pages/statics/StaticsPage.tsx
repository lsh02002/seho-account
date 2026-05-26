import React from "react";

import Layout from "../../components/layouts/Layout";
import PieAccountChart from "../../components/cards/statics/PieAccountChart";

const StaticsPage = () => {
  return (
    <Layout>
      <div
        className="w-100"
        style={{
          marginTop: "70px",
        }}
      >
        <PieAccountChart />
      </div>
    </Layout>
  );
};

export default StaticsPage;
