import React, { useMemo } from "react";
import { transactionResponseType } from "../../../types/type";
import {
  eachWeekOfInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  endOfWeek,
  parseISO,
  format,
  isWithinInterval,
} from "date-fns";
import { ko } from "date-fns/locale";

type MonthCardPropsType = {
  filteredList: transactionResponseType[];
  date: string;
};

const toDate = (d: string | Date) => (d instanceof Date ? d : parseISO(d));

const getWeeksOfMonth = (monthDate: Date) => {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);

  const weekStarts = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

  return weekStarts.map((weekStart) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    const realEnd = weekEnd > end ? end : weekEnd;

    return {
      start: weekStart,
      end: realEnd,
      days: eachDayOfInterval({
        start: weekStart,
        end: realEnd,
      }),
    };
  });
};

const formatRange = (start: Date, end: Date) =>
  `${format(start, "MM/dd(E)", { locale: ko })} ~ ${format(end, "MM/dd(E)", {
    locale: ko,
  })}`;

const MonthAccountCard = ({ filteredList, date }: MonthCardPropsType) => {
  const monthDate = useMemo(() => {
    const normalized = date.length === 7 ? `${date}-01` : date;
    return toDate(normalized);
  }, [date]);

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

  const weekly = useMemo(() => {
    const weeks = getWeeksOfMonth(monthDate);

    return weeks.map(({ start, end }) => {
      let income = 0;
      let expense = 0;

      for (const it of filteredList) {
        const d = toDate(it.transactionDate);

        if (isWithinInterval(d, { start, end })) {
          if (it.type === "INCOME") income += it.amount;
          else if (it.type === "EXPENSE") expense += it.amount;
        }
      }

      return {
        label: formatRange(start, end),
        start,
        end,
        income,
        expense,
        total: income - expense,
      };
    });
  }, [filteredList, monthDate]);

  return (
    <div className="bg-white rounded mt-4">
      <div className="p-3 m-2 mb-3">
        <div className="text-danger mb-1">
          월별: {format(monthDate, "yyyy.MM", { locale: ko })}
        </div>

        <div className="d-flex flex-wrap gap-3">
          <div className="fw-bold">총합: {total.toLocaleString()}원</div>

          <div className="text-primary">
            수입: {incomeTotal.toLocaleString()}원
          </div>

          <div className="text-danger">
            지출: {expenseTotal.toLocaleString()}원
          </div>
        </div>
      </div>

      <div>
        {weekly.map((w) => (
          <div key={w.label} className="border-top p-3 m-3 small">
            <div className="mb-1">{w.label}</div>

            <div className="d-flex flex-wrap gap-3">
              <div>총합: {w.total.toLocaleString()}원</div>

              <div className="text-primary">
                수입: {w.income.toLocaleString()}원
              </div>

              <div className="text-danger">
                지출: {w.expense.toLocaleString()}원
              </div>
            </div>
          </div>
        ))}

        {weekly.every((w) => w.income === 0 && w.expense === 0) && (
          <div className="text-secondary mt-2 m-2 small">
            해당 월의 주별 거래 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthAccountCard;
