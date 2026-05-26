import React, { memo } from "react";
import { transactionResponseType } from "../../../types/type";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { registerLocale } from "react-datepicker";

registerLocale("ko", ko);

const TransCardOne = ({ item }: { item: transactionResponseType }) => {
  const navigator = useNavigate();

  return (
    <div
      className="d-flex justify-content-between align-items-center w-100 border-top py-2"
      style={{
        fontSize: "0.85rem",
        cursor: "pointer",
      }}
      onClick={() => navigator(`/modify-transaction/${item.bookId}/${item.id}`)}
    >
      <div className="w-100">{item.categoryName}</div>

      <div className="w-100 d-flex flex-column">
        <span>{item.note}</span>

        <span className="text-secondary" style={{ fontSize: "0.7rem" }}>
          {format(item.transactionDate, "a hh:mm", {
            locale: ko,
          })}
        </span>
      </div>

      <div className="w-100 text-end">
        {item.type === "INCOME" ? (
          <span className="text-primary">{item.amount.toLocaleString()}원</span>
        ) : (
          <span className="text-danger">{item.amount.toLocaleString()}원</span>
        )}
      </div>
    </div>
  );
};

export default memo(TransCardOne);
