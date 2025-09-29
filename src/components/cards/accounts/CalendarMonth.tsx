import React, { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import styled from "styled-components";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useLogin } from "../../../context/loginContext";
import { addMonths, addYears, format } from "date-fns";

registerLocale("ko", ko);

const CalendarMonth = () => {
  const { startDate, setStartDate, startMonth, setStartMonth } = useLogin();
  const { isDayDate } = useLogin();

  const HiddenInput = forwardRef<HTMLInputElement>((props, ref) => (
    <input {...props} ref={ref} style={{ display: "none" }} />
  ));

  return (
    <Container>
      <DatePicker
        selected={isDayDate ? startDate : startMonth}
        onChange={
          isDayDate
            ? (date: Date | null) => setStartDate(date)
            : (date: Date | null) => setStartMonth(date)
        }
        dateFormat={isDayDate ? "yyyy년 MM월" : "yyyy년"}
        showMonthYearPicker
        inline
        locale="ko"
        customInput={<HiddenInput />}
        calendarClassName="only-header"
        renderCustomHeader={(
          { date } // ← monthDate → date
        ) => (
          <>
            <button
              type="button"
              onClick={
                isDayDate
                  ? () => setStartDate(addMonths(date, -1))
                  : () => setStartMonth(addYears(date, -1))
              }
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {"<"}
            </button>
            <span>
              {format(date, isDayDate ? "yyyy년 M월" : "yyyy년", {
                locale: ko,
              })}
            </span>
            <button
              type="button"
              onClick={
                isDayDate
                  ? () => setStartDate(addMonths(date, 1))
                  : () => setStartMonth(addYears(date, 1))
              }
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {">"}
            </button>
          </>
        )}
      />
    </Container>
  );
};

export default CalendarMonth;

const Container = styled.div`
  .only-header.react-datepicker {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    font-size: 1rem;
  }

  /* 상단 헤더 바탕/보더 제거 */
  .only-header .react-datepicker__header {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  /* 월/연 텍스트 줄 마진/패딩 최소화(선택) */
  .only-header .react-datepicker__header {
    padding: 0 !important;
    margin: 0 !important;
  }

  /* 위에서 이미 쓰시던 숨김 규칙 유지 (월 그리드/연도 헤더 등) */
  .only-header .react-datepicker-year-header {
    display: none !important;
  }
  .only-header .react-datepicker__month-wrapper {
    display: none !important;
  }
  .only-header .react-datepicker__header__dropdown,
  .only-header .react-datepicker__current-month {
    display: none !important;
  }
  .only-header .react-datepicker__triangle {
    display: none !important;
  }
`;
