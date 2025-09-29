import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../../components/layouts/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { useLogin } from "../../context/loginContext";
import { GetTransactionsApi } from "../../api/sehomallApi";
import { format, parseISO, isValid as isValidDate } from "date-fns";
import koLocale from "@fullcalendar/core/locales/ko";
import { transactionResponseType } from "../../types/type";
import DayAccountCard from "../../components/cards/accounts/DayAccountCard";

const CalendarAccountPage = () => {
  const { selectMenu, transList, setTransList, startDate, setIsDayDate } =
    useLogin();

  const calendarRef = useRef<FullCalendar | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<Date | null>(new Date());

  // 거래 목록 로딩
  useEffect(() => {
    GetTransactionsApi(parseInt(selectMenu?.value ?? "0"))
      .then((res) => {
        setTransList(res?.data?.content ?? []);
        if (res?.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers.accesstoken);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.detailMessage) {
          console.error(err.response.data.detailMessage);
        } else {
          console.error(err?.message);
        }
      });

    setIsDayDate(true);
  }, [selectMenu?.value, setIsDayDate, setTransList]);

  // 날짜별 수입/지출 합계
  const dailySummary = useMemo(() => {
    return (transList ?? []).reduce<
      Record<string, { income: number; expense: number }>
    >((acc, it) => {
      const key = format(new Date(it.transactionDate), "yyyy-MM-dd");
      if (!acc[key]) acc[key] = { income: 0, expense: 0 };
      if (it.type === "INCOME") acc[key].income += it.amount;
      else if (it.type === "EXPENSE") acc[key].expense += it.amount;
      return acc;
    }, {});
  }, [transList]);

  // FullCalendar 이벤트
  const dailyEvents = useMemo(
    () =>
      Object.keys(dailySummary).map((date) => ({
        start: date,
        allDay: true,
        extendedProps: {
          income: dailySummary[date].income,
          expense: dailySummary[date].expense,
          total: dailySummary[date].income - dailySummary[date].expense,
        },
      })),
    [dailySummary]
  );

  // 원 단위 포맷
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("ko-KR").format(value) + "원";

  // startDate 안전 처리
  const safeInitialDate: Date = useMemo(() => {
    if (!startDate) return new Date();
    const d =
      startDate instanceof Date ? startDate : parseISO(String(startDate));
    return isValidDate(d) ? d : new Date();
  }, [startDate]);

  const filteredList = useMemo(
    () =>
      transList?.filter(
        (transaction: transactionResponseType) =>
          format(new Date(transaction.transactionDate), "yyyy-MM-dd") ===
          format(modalDate ?? "", "yyyy-MM-dd")
      ),
    [transList, modalDate]
  );

  // startDate 바뀔 때 달력 이동
  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (!api) return;

    if (startDate) {
      const d =
        startDate instanceof Date ? startDate : parseISO(String(startDate));
      if (isValidDate(d)) {
        api.gotoDate(d);
        return;
      }
    }
    api.today();
  }, [startDate]);

  const handleDateClick = (arg: { date: Date }) => {
    setModalDate(arg.date);
    setIsModalOpen(true);
  };

  const handleEventClick = (arg: { event: any; jsEvent: MouseEvent }) => {
    arg.jsEvent.preventDefault(); // (링크/네비게이션 막기)
    const clickedDate = arg.event.start; // dailyEvents는 하루짜리 allDay라 start가 해당 날짜
    if (clickedDate) {
      setModalDate(clickedDate);
      setIsModalOpen(true);
    }
  };

  return (
    <Layout isTopNav={true}>
      <Container>
        <FullCalendar
          ref={calendarRef as any}
          height="calc(100vh - 180px)"
          initialView="dayGridMonth"
          initialDate={safeInitialDate}
          plugins={[dayGridPlugin, interactionPlugin]}
          locale={koLocale}
          events={dailyEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          // prev/next 제거 → today + 월/주/일 버튼만 표시
          headerToolbar={{
            left: "today",
            center: "",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          buttonText={{ today: "오늘", month: "월", week: "주", day: "일" }}
          eventContent={(arg) => {
            const {
              income = 0,
              expense = 0,
              total = 0,
            } = arg.event.extendedProps ?? {};

            if (!income && !expense && !total) return { domNodes: [] };

            const wrap = document.createElement("div");
            wrap.style.fontSize = "0.7rem";
            wrap.style.lineHeight = "1.2";
            wrap.style.whiteSpace = "normal";

            if (income) {
              const inc = document.createElement("div");
              inc.textContent = `+${formatCurrency(income)}`;
              inc.style.color = "blue";
              wrap.appendChild(inc);
            }
            if (expense) {
              const exp = document.createElement("div");
              exp.textContent = `-${formatCurrency(expense)}`;
              exp.style.color = "red";
              wrap.appendChild(exp);
            }

            const sum = document.createElement("div");
            sum.textContent = `${formatCurrency(total)}`;
            sum.style.fontWeight = "bold";
            sum.style.color = "#000";
            wrap.appendChild(sum);

            return { domNodes: [wrap] };
          }}
        />
        {isModalOpen && (
          <ModalOverlay onClick={() => setIsModalOpen(false)}>
            <ModalCard>
              <DayAccountCard
                filteredList={filteredList}
                date={format(modalDate ?? "", "yyyy-MM-dd")}
              />
              <ActionBtn onClick={() => setIsModalOpen(false)}>닫기</ActionBtn>
            </ModalCard>
          </ModalOverlay>
        )}
      </Container>
    </Layout>
  );
};

export default CalendarAccountPage;

const Container = styled.div`
  margin-top: 70px;
  width: 100%;

  .fc-daygrid-day-number {
    font-size: 0.7rem;
  }

  .fc-daygrid-event,
  .fc-event {
    background: transparent !important;
    border: none !important;
  }

  .fc-event-title,
  .fc-daygrid-event .fc-event-title {
    font-size: 0.6rem;
    white-space: normal !important;
    word-break: break-word;
    line-height: 1.2;
    color: #333;
    padding: 0;
    margin: 0;
  }

  /* 🔽 오늘 / 월 / 주 / 일 버튼 크기 조정 */
  .fc .fc-toolbar .fc-button {
    font-size: 0.9rem; /* 원하는 크기로 변경 */
    padding: 2px 6px; /* 버튼 안 여백 줄이기 */
    height: auto;
    background-color: transparent;
    border: none;
    border-radius: 0;
    color: black;
  }
`;

/* 간단한 모달 스타일 */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100; /* FullCalendar 위로 */
`;

const ModalCard = styled.div`
  width: min(520px, 92vw);
  max-height: 80vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  margin: 10px;
  padding: 20px;
`;

const ActionBtn = styled.button`
  border: none;
  background-color: gray;
  color: white;
  padding: 6px 10px;
  cursor: pointer;
  margin-top: 20px;
`;
