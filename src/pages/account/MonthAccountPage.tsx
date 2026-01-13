import React, { useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import styled from "styled-components";
import { useLogin } from "../../context/loginContext";
import { format, isSameYear, parseISO } from "date-fns";
import { transactionResponseType } from "../../types/type";
import MonthAccountCard from "../../components/cards/accounts/MonthAccountCard";
import NoTransactions from "../../components/layouts/NoTransactions";

const MonthAccountPage = () => {
  const { myBook, startMonth } = useLogin();
  const { transList } = useLogin();

  const { setIsDayDate } = useLogin();

  useEffect(() => {
    if (myBook) {
      setIsDayDate(false);
    }
  }, [myBook, setIsDayDate]);

  const yearTransList = transList?.filter((t: transactionResponseType) =>
    isSameYear(parseISO(t.transactionDate), startMonth!)
  );

  const markedDates = (yearTransList ?? []).reduce<
    Record<string, { marked: boolean }>
  >((acc, current) => {
    const formattedDate = format(new Date(current.transactionDate), "yyyy-MM");
    acc[formattedDate] = { marked: true };
    return acc;
  }, {});

  return (
    <Layout isTopNav={true}>
      <Container>
        <Title>월별 기입내역</Title>
        {Object.entries(markedDates)?.length > 0 ? (
          Object.entries(markedDates)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, value]) => {
              if (value.marked) {
                const filteredList =
                  yearTransList?.filter(
                    (item) =>
                      format(new Date(item.transactionDate), "yyyy-MM") ===
                      format(date, "yyyy-MM")
                  ) ?? [];
                return (
                  <MonthAccountCard
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
      </Container>
    </Layout>
  );
};

export default MonthAccountPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 50px;
`;

const Title = styled.h3``;
