import Day from "../../assets/day.svg";
import Month from "../../assets/month.svg";
import Calendar from "../../assets/calendar.svg";
import Revenue from "../../assets/revenue.svg";
import Memo from "../../assets/memo.svg";

import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <nav
      className="d-flex justify-content-between align-items-center position-fixed start-0 end-0 bg-white"
      style={{
        top: "50px",
        height: "50px",
        zIndex: 300,
        marginTop: "10px",
      }}
    >
      <div
        className="pb-3 d-flex justify-content-evenly align-items-center w-100 border-bottom bg-white"
        style={{
          height: "50px",
          // fontSize: "0.8rem",
        }}
      >
        <Link
          to="/"
          className="d-flex flex-column align-items-center text-decoration-none text-dark"
        >
          <div>
            <img src={Day} alt="일일" style={{ width: "1.5rem" }} />
          </div>

          <div>일일</div>
        </Link>

        <Link
          to="/month"
          className="d-flex flex-column align-items-center text-decoration-none text-dark"
        >
          <div>
            <img src={Month} alt="월별" style={{ width: "1.5rem" }} />
          </div>

          <div>월별</div>
        </Link>

        <Link
          to="/calendar"
          className="d-flex flex-column align-items-center text-decoration-none text-dark"
        >
          <div>
            <img src={Calendar} alt="달력" style={{ width: "1.5rem" }} />
          </div>

          <div>달력</div>
        </Link>

        <Link
          to="/summary"
          className="d-flex flex-column align-items-center text-decoration-none text-dark"
        >
          <div>
            <img src={Revenue} alt="결산" style={{ width: "1.5rem" }} />
          </div>

          <div>결산</div>
        </Link>

        <Link
          to="/memo"
          className="d-flex flex-column align-items-center text-decoration-none text-dark"
        >
          <div>
            <img src={Memo} alt="메모" style={{ width: "1.5rem" }} />
          </div>

          <div>메모</div>
        </Link>
      </div>
    </nav>
  );
};

export default TopNav;
