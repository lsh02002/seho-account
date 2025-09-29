import React, { useMemo } from "react";
import styled from "styled-components";
import { transactionResponseType } from "../../../types/type";
import TransCardOne from "./TransCardOne";

type AccountDayPagePropsType = {
  filteredList: transactionResponseType[];
  date: string;
};

const DayAccountCard = ({ filteredList, date }: AccountDayPagePropsType) => {
  const { incomeTotal, expenseTotal, total } = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const it of filteredList) {
      if (it.type === "INCOME") income += it.amount;
      else if (it.type === "EXPENSE") expense += it.amount;
    }
    return {
      incomeTotal: income,
      expenseTotal: expense,
      total: income - expense,
    };
  }, [filteredList]);

  return (
    <div key={date}>
      <TodayTotal>
        <TodayDate>기입일: {date}</TodayDate>
        <MoneyInfo>
          <Total>총합:{total.toLocaleString()}원</Total>
          <IncomeTotal>수입:{incomeTotal.toLocaleString()}원</IncomeTotal>
          <ExpenseTotal>
            지출:
            {expenseTotal.toLocaleString()}원
          </ExpenseTotal>
        </MoneyInfo>
        {filteredList.map((item) => (
          <TransCardOne key={item.id} item={item} />
        ))}
      </TodayTotal>
    </div>
  );
};

export default DayAccountCard;

const TodayTotal = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 0.9rem;
  border: 1px solid #d0d0d0;
  padding: 10px;
  border-radius: 8px;
  box-sizing: border-box;
`;

const TodayDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: red;
`;

const MoneyInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Total = styled.div`
  font-weight: bold;
`;

const IncomeTotal = styled.div`
  color: blue;
`;

const ExpenseTotal = styled.div`
  color: red;
`;
