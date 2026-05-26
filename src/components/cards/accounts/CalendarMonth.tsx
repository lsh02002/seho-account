import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useLogin } from "../../../context/loginContext";
import { addMonths, addYears, format } from "date-fns";

registerLocale("ko", ko);

const CalendarMonth = () => {
  const { startDate, setStartDate, startMonth, setStartMonth } = useLogin();

  const { isDayDate } = useLogin();

  return (
    <div className="bg-white d-flex justify-content-center">
      <style>
        {`
          .only-header .react-datepicker__month-container {
            width: auto;
          }

          .only-header .react-datepicker__month,
          .only-header .react-datepicker__month-wrapper,
          .only-header .react-datepicker__year,
          .only-header .react-datepicker__year-wrapper,
          .only-header .react-datepicker__day-names,
          .only-header .react-datepicker__week,
          .only-header .react-datepicker__day,
          .only-header .react-datepicker__triangle,
          .only-header .react-datepicker__current-month {
            display: none !important;
          }

          .only-header.react-datepicker {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
          }

          .only-header .react-datepicker__header {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
        `}
      </style>

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
        calendarClassName="only-header"
        renderCustomHeader={({ date }) => (
          <div className="d-flex align-items-center justify-content-between px-2 py-1 w-100">
            <button
              type="button"
              className="btn btn-link text-dark text-decoration-none p-0"
              onClick={
                isDayDate
                  ? () => setStartDate(addMonths(date, -1))
                  : () => setStartMonth(addYears(date, -1))
              }
            >
              {"<"}
            </button>

            <span className="fw-semibold">
              {format(date, isDayDate ? "yyyy년 M월" : "yyyy년", {
                locale: ko,
              })}
            </span>

            <button
              type="button"
              className="btn btn-link text-dark text-decoration-none p-0"
              onClick={
                isDayDate
                  ? () => setStartDate(addMonths(date, 1))
                  : () => setStartMonth(addYears(date, 1))
              }
            >
              {">"}
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default CalendarMonth;
