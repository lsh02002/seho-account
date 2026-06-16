import React, { useMemo } from "react";
import {
  isSameDay,
  isWithinInterval,
  parseISO,
  startOfDay,
  endOfDay,
} from "date-fns";
import TransCardOne from "./TransCardOne";
import { useLogin } from "../../../context/loginContext";
import { useLocation } from "react-router-dom";

type AccountDayPagePropsType = {
  date: string;
};

const DayAccountCard = ({ date }: AccountDayPagePropsType) => {
  const location = useLocation();
  const { transList } = useLogin();

  const { weekStart, weekEnd } = useMemo(() => {
    return {
      weekStart: location.state?.weekStart
        ? parseISO(location.state?.weekStart.toISOString())
        : null,

      weekEnd: location.state?.weekEnd
        ? parseISO(location.state?.weekEnd.toISOString())
        : null,
    };
  }, [location.state]);

  const filteredList = useMemo(() => {
    return (
      transList?.filter((item) => {
        const transactionDate = parseISO(item.transactionDate);

        // 주별 화면에서 들어온 경우
        if (weekStart && weekEnd) {
          return isWithinInterval(transactionDate, {
            start: startOfDay(weekStart),
            end: endOfDay(weekEnd),
          });
        }

        // 월별 화면인 경우 해당 date 하루만 표시
        return isSameDay(transactionDate, parseISO(date));
      }) ?? []
    );
  }, [transList, weekStart, weekEnd, date]);

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
    <div className="bg-white rounded p-4 mt-4">
      <div className="rounded w-100 d-flex flex-column align-items-center">
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
