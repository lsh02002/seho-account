import React, { useEffect, useMemo } from "react";
import Layout from "../../components/layouts/Layout";
import { transactionResponseType } from "../../types/type";
import { useLogin } from "../../context/loginContext";
import { format, isSameMonth, parseISO } from "date-fns";
import DayAccountCard from "../../components/cards/accounts/DayAccountCard";
import NoTransactions from "../../components/layouts/NoTransactions";
import { useLocation } from "react-router-dom";

const DayAccountPage = () => {
  const location = useLocation();

  const weekFilteredList = useMemo(() => {
    return location.state?.weekFilteredList;
  }, [location.state]);

  const { myBook, startDate, transList, setIsDayDate } = useLogin();

  useEffect(() => {
    if (myBook) {
      setIsDayDate(true);
    }
  }, [myBook, setIsDayDate]);

  const monthTransList = useMemo(() => {
    if (weekFilteredList !== undefined) {
      return weekFilteredList;
    }

    return transList?.filter((t: transactionResponseType) =>
      isSameMonth(parseISO(t.transactionDate), startDate!),
    );
  }, [weekFilteredList, transList, startDate]);

  const markedDates: Record<string, { marked: boolean }> = useMemo(() => {
    return (monthTransList ?? []).reduce(
      (
        acc: Record<string, { marked: boolean }>,
        current: transactionResponseType,
      ) => {
        const formattedDate = format(
          new Date(current.transactionDate),
          "yyyy-MM-dd",
        );

        acc[formattedDate] = { marked: true };

        return acc;
      },
      {} as Record<string, { marked: boolean }>,
    );
  }, [monthTransList]);

  return (
    <Layout isTopNav={true}>
      <div className="d-flex flex-column w-100 pt-5">
        <h3>일일 기입내역</h3>

        {Object.entries(markedDates)?.length > 0 ? (
          Object.entries(markedDates)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, value]) => {
              if (value.marked) {
                const filteredList =
                  monthTransList?.filter(
                    (item: transactionResponseType) =>
                      format(new Date(item.transactionDate), "yyyy-MM-dd") ===
                      date,
                  ) ?? [];

                return (
                  <DayAccountCard
                    key={date}
                    filteredList={filteredList}
                    date={date}
                  />
                );
              }

              return null;
            })
        ) : (
          <NoTransactions />
        )}
      </div>
    </Layout>
  );
};

export default DayAccountPage;
