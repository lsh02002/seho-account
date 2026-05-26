import React from "react";
import Layout from "./Layout";

import LostItems from "../../assets/lost-items.svg";

const NoTransactions = () => {
  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center flex-column w-100"
        style={{
          marginTop: "50px",
        }}
      >
        <img
          src={LostItems}
          alt="거래 내역 없음"
          style={{
            width: "50px",
          }}
        />

        <div
          className="mt-3"
          style={{
            marginTop: "20px",
          }}
        >
          해당 기입 내역이 없습니다.
        </div>
      </div>
    </Layout>
  );
};

export default NoTransactions;
