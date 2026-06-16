import React, { useEffect, useMemo } from "react";
import Layout from "../../components/layouts/Layout";
import { transactionResponseType } from "../../types/type";
import { useLogin } from "../../context/loginContext";
import {
  format,
  isSameMonth,
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from "date-fns";
import DayAccountCard from "../../components/cards/accounts/DayAccountCard";
import NoTransactions from "../../components/layouts/NoTransactions";
import { useLocation } from "react-router-dom";

const DayAccountPage = () => {
  const location = useLocation();
  const { myBook, startDate, transList, setIsDayDate } = useLogin();

  const { weekStart, weekEnd } = useMemo(() => {
    return {
      weekStart: location.state?.weekStart
        ? startOfDay(new Date(location.state.weekStart))
        : null,
      weekEnd: location.state?.weekEnd
        ? endOfDay(new Date(location.state.weekEnd))
        : null,
    };
  }, [location.state]);

  useEffect(() => {
    if (myBook) {
      setIsDayDate(true);
    }
  }, [myBook, setIsDayDate]);

  const monthTransList = useMemo(() => {
    if (!transList) return [];

    if (weekStart && weekEnd) {
      return transList.filter((t: transactionResponseType) =>
        isWithinInterval(parseISO(t.transactionDate), {
          start: weekStart,
          end: weekEnd,
        }),
      );
    }

    return transList.filter((t: transactionResponseType) =>
      isSameMonth(parseISO(t.transactionDate), startDate!),
    );
  }, [transList, startDate, weekStart, weekEnd]);

  const markedDates = useMemo(() => {
    return monthTransList.reduce(
      (acc: Record<string, { marked: boolean }>, current) => {
        const formattedDate = format(
          new Date(current.transactionDate),
          "yyyy-MM-dd",
        );

        acc[formattedDate] = { marked: true };
        return acc;
      },
      {},
    );
  }, [monthTransList]);

  return (
    <Layout isTopNav={true}>
      <div className="d-flex flex-column w-100 pt-5">
        <h3>일일 기입내역</h3>

        {Object.entries(markedDates).length > 0 ? (
          Object.entries(markedDates)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, value]) => {
              if (!value.marked) return null;

              return <DayAccountCard key={date} date={date} />;
            })
        ) : (
          <NoTransactions />
        )}
      </div>
    </Layout>
  );
};

export default DayAccountPage;
