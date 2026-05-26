import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../../components/layouts/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useLogin } from "../../context/loginContext";
import { format, parseISO, isValid as isValidDate } from "date-fns";
import koLocale from "@fullcalendar/core/locales/ko";
import { transactionResponseType } from "../../types/type";
import DayAccountCard from "../../components/cards/accounts/DayAccountCard";

const CalendarAccountPage = () => {
  const { myBook, transList, setTransList, startDate, setIsDayDate } =
    useLogin();

  const calendarRef = useRef<FullCalendar | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<Date | null>(new Date());

  // 거래 목록 로딩
  useEffect(() => {
    if (myBook) {
      setIsDayDate(true);
    }
  }, [myBook, setIsDayDate, setTransList]);

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
    [dailySummary],
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
          format(modalDate ?? "", "yyyy-MM-dd"),
      ),
    [transList, modalDate],
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
      <div
        className="bg-white w-100 calendar-container"
        style={{
          marginTop: "70px",
        }}
      >
        <style>
          {`
          .calendar-container .fc-daygrid-day-number {
            font-size: 0.7rem;
          }

          .calendar-container .fc-daygrid-event,
          .calendar-container .fc-event {
            background: transparent !important;
            border: none !important;
          }

          .calendar-container .fc-event-title,
          .calendar-container .fc-daygrid-event .fc-event-title {
            font-size: 0.6rem;
            white-space: normal !important;
            word-break: break-word;
            line-height: 1.2;
            color: #333;
            padding: 0;
            margin: 0;
          }

          .calendar-container .fc .fc-toolbar .fc-button {
            font-size: 0.9rem;
            padding: 2px 6px;
            height: auto;
            background-color: transparent;
            border: none;
            border-radius: 0;
            color: black;
            box-shadow: none !important;
          }

          .calendar-container .fc .fc-toolbar .fc-button:focus,
          .calendar-container .fc .fc-toolbar .fc-button:active {
            box-shadow: none !important;
            outline: none !important;
          }
        `}
        </style>

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
          headerToolbar={{
            left: "today",
            center: "",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          buttonText={{
            today: "오늘",
            month: "월",
            week: "주",
            day: "일",
          }}
          eventContent={(arg) => {
            const {
              income = 0,
              expense = 0,
              total = 0,
            } = arg.event.extendedProps ?? {};

            if (!income && !expense && !total) {
              return { domNodes: [] };
            }

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
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
              background: "rgba(0, 0, 0, 0.45)",
              zIndex: 1100,
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white d-flex flex-column overflow-hidden p-4 m-2"
              style={{
                width: "min(520px, 92vw)",
                maxHeight: "80vh",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <DayAccountCard
                filteredList={filteredList}
                date={format(modalDate ?? "", "yyyy-MM-dd")}
              />

              <button
                className="btn btn-secondary mt-3"
                onClick={() => setIsModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CalendarAccountPage;
