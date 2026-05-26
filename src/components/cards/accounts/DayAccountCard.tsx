import React, { useMemo } from "react";
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
    <div className="bg-white mt-4">
      <div className="rounded p-3 w-100 d-flex flex-column align-items-center">
        <div className="w-100 text-danger mb-2">기입일: {date}</div>

        <div className="w-100 d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <div className="fw-bold">총합: {total.toLocaleString()}원</div>

          <div className="text-primary">
            수입: {incomeTotal.toLocaleString()}원
          </div>

          <div className="text-danger">
            지출: {expenseTotal.toLocaleString()}원
          </div>
        </div>

        <div className="w-100">
          {filteredList.map((item) => (
            <TransCardOne key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayAccountCard;
