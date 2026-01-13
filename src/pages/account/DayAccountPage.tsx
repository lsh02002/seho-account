import React, { useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import styled from "styled-components";
import { transactionResponseType } from "../../types/type";
import { useLogin } from "../../context/loginContext";
import { format, isSameMonth, parseISO } from "date-fns";
import DayAccountCard from "../../components/cards/accounts/DayAccountCard";
import NoTransactions from "../../components/layouts/NoTransactions";

const DayAccountPage = () => {
  const { myBook, startDate } = useLogin();
  const { transList } = useLogin();
  const { setIsDayDate } = useLogin();

  useEffect(() => {
    if (myBook) {
      setIsDayDate(true);
    }
  }, [myBook, setIsDayDate]);

  const monthTransList = transList?.filter((t: transactionResponseType) =>
    isSameMonth(parseISO(t.transactionDate), startDate!)
  );

  const markedDates = (monthTransList ?? []).reduce<
    Record<string, { marked: boolean }>
  >((acc, current) => {
    const formattedDate = format(
      new Date(current.transactionDate),
      "yyyy-MM-dd"
    );
    acc[formattedDate] = { marked: true };
    return acc;
  }, {});

  return (
    <Layout isTopNav={true}>
      <TransWrapper>
        <Title>일일 기입내역</Title>
        {Object.entries(markedDates)?.length > 0 ? (
          Object.entries(markedDates)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, value]) => {
              if (value.marked) {
                const filteredList =
                  monthTransList?.filter(
                    (item) =>
                      format(new Date(item.transactionDate), "yyyy-MM-dd") ===
                      date
                  ) ?? [];
                return (
                  <DayAccountCard
                    key={date}
                    filteredList={filteredList}
                    date={date}
                  />
                );
              } else {
                return null;
              }
            })
        ) : (
          <NoTransactions />
        )}
      </TransWrapper>
    </Layout>
  );
};

export default DayAccountPage;

const TransWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 50px;
`;

const Title = styled.h3``;
