import Day from "../../assets/day.svg";
import Month from "../../assets/month.svg";
import Calendar from "../../assets/calendar.svg";
import Revenue from "../../assets/revenue.svg";
import Memo from "../../assets/memo.svg";

import { Link } from "react-router-dom";
import { useModalManager } from "../../context/ModalContext";

const menus = [
  {
    to: "/",
    icon: Day,
    alt: "일일",
    label: "일일",
  },
  {
    to: "/month",
    icon: Month,
    alt: "월별",
    label: "월별",
  },
  {
    to: "/calendar",
    icon: Calendar,
    alt: "달력",
    label: "달력",
  },
  {
    to: "/summary",
    icon: Revenue,
    alt: "결산",
    label: "결산",
  },
  {
    to: "/memo",
    icon: Memo,
    alt: "메모",
    label: "메모",
  },
];

const TopNav = () => {
  const { hasOpenModal, closeTopModal } = useModalManager();

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
        }}
      >
        {menus.map((menu) => (
          <Link
            key={menu.to}
            to={menu.to}
            className="d-flex flex-column align-items-center text-decoration-none text-dark"
            onClick={(e) => {
              e.stopPropagation(); // 필요하면 유지

              if (hasOpenModal) {
                e.preventDefault();
                closeTopModal();
                return;
              }
            }}
          >
            <div>
              <img src={menu.icon} alt={menu.alt} style={{ width: "1.5rem" }} />
            </div>

            <div>{menu.label}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default TopNav;
