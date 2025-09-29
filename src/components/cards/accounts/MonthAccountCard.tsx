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
  date: string; // "2023-10" 또는 "2023-10-01" 같이 해당 월을 나타내는 값
};

const toDate = (d: string | Date) => (d instanceof Date ? d : parseISO(d));

const getWeeksOfMonth = (monthDate: Date) => {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);

  // 월요일 시작 기준으로, 해당 월을 주 시작일 배열로
  const weekStarts = eachWeekOfInterval(
    { start, end },
    { weekStartsOn: 1 } // Mon
  );

  // 각 주의 시작~끝 날짜 배열
  const weeks = weekStarts.map((weekStart) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    return {
      start: weekStart,
      end: weekEnd > end ? end : weekEnd, // 월말 넘어가면 자르기
      days: eachDayOfInterval({
        start: weekStart,
        end: weekEnd > end ? end : weekEnd,
      }),
    };
  });

  return weeks;
};

const formatRange = (start: Date, end: Date) =>
  `${format(start, "MM/dd(E)", { locale: ko })} ~ ${format(end, "MM/dd(E)", {
    locale: ko,
  })}`;

const MonthAccountCard = ({ filteredList, date }: MonthCardPropsType) => {
  // 사용자가 준 date가 "YYYY-MM" 또는 "YYYY-MM-DD" 형식이라 가정
  const monthDate = useMemo(() => {
    // "YYYY-MM" 처리를 위해 day 미지정 시 1일로 보정
    const normalized = date.length === 7 ? `${date}-01` : date;
    return toDate(normalized);
  }, [date]);

  // 월 전체 합계
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

  // 주별 합계
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
    <div
      key={date}
      style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 20 }}
    >
      {/* 월 합계 영역 */}
      <div className="mb-3" style={{ margin: 5 }}>
        <div style={{ fontSize: "0.9rem", color: "red" }}>
          월별: {format(monthDate, "yyyy.MM", { locale: ko })}
        </div>
        <div style={{ fontSize: "0.9rem", display: "flex", gap: 12 }}>
          <div style={{ fontWeight: "bold" }}>
            총합: {total.toLocaleString()}원
          </div>
          <div style={{ color: "blue" }}>
            수입: {incomeTotal.toLocaleString()}원
          </div>
          <div style={{ color: "red" }}>
            지출: {expenseTotal.toLocaleString()}원
          </div>
        </div>
      </div>

      {/* 주별 리스트 */}
      <div>
        {weekly.map((w) => (
          <div
            key={w.label}
            style={{
              fontSize: "0.8rem",
              padding: 5,
              margin: 8,
              borderTop: "1px solid #e5e7eb",
              boxSizing: "border-box",
            }}
          >
            <div>{w.label}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div>총합: {w.total.toLocaleString()}원</div>
              <div style={{ color: "blue" }}>
                수입: {w.income.toLocaleString()}원
              </div>
              <div style={{ color: "red" }}>
                지출: {w.expense.toLocaleString()}원
              </div>
            </div>
          </div>
        ))}

        {/* 주별 합계가 모두 0원이라면 표시 */}
        {weekly.every((w) => w.income === 0 && w.expense === 0) && (
          <div style={{ color: "#6b7280", marginTop: 8 }}>
            해당 월의 주별 거래 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthAccountCard;
