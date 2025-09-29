import React, { memo } from "react";
import { transactionResponseType } from "../../../types/type";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { registerLocale } from "react-datepicker";

registerLocale("ko", ko);

const TransCardOne = ({ item }: { item: transactionResponseType }) => {
  const navigator = useNavigate();
  return (
    <Container
      onClick={() => navigator(`/modify-transaction/${item.bookId}/${item.id}`)}
    >
      <div>{item.categoryName}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{item.note}</span>
        <span style={{ fontSize: "0.7rem" }}>
          {format(item.transactionDate, "a hh:mm", { locale: ko })}
        </span>
      </div>
      <div>
        {item.type === "INCOME" ? (
          <IncomeSpan>{item.amount.toLocaleString()}원</IncomeSpan>
        ) : (
          <ExpenseSpan>{item.amount.toLocaleString()}원</ExpenseSpan>
        )}
      </div>
    </Container>
  );
};

export default memo(TransCardOne);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid #e5e7eb;
  box-sizing: border-box;
  font-size: 0.8rem;

  div {
    width: 100%;
    padding: 8px 0;
  }

  div:last-child {
    text-align: right;
  }
`;

const IncomeSpan = styled.span`
  color: blue;
`;

const ExpenseSpan = styled.span`
  color: red;
`;
