import Account from "../../assets/account.svg";
import Statics from "../../assets/statics.svg";
import MyPage from "../../assets/my-page.svg";
import Cart from "../../assets/cart.svg";

import { Link } from "react-router-dom";
import { useModalManager } from "../../context/ModalContext";

const menus = [
  {
    to: "/",
    icon: Account,
    alt: "가계부",
    label: "가계부",
  },
  {
    to: "/statics",
    icon: Statics,
    alt: "통계",
    label: "통계",
  },
  {
    to: "/mypage/REVIEWS?page=1&size=4",
    icon: MyPage,
    alt: "마이페이지",
    label: "마이페이지",
  },
  {
    to: "/cart",
    icon: Cart,
    alt: "장바구니",
    label: "장바구니",
  },
];

const BottomNav = () => {
  const { hasOpenModal, closeTopModal } = useModalManager();

  return (
    <nav
      className="d-flex justify-content-between align-items-center border-top position-fixed bottom-0 start-0 end-0 bg-white"
      style={{
        height: "70px",
        zIndex: 200,
      }}
    >
      <div
        className="d-flex justify-content-evenly align-items-center w-100"
        style={{
          height: "70px",
        }}
      >
        {menus.map((menu) => (
          <Link
            key={menu.to}
            to={menu.to}
            className="d-flex flex-column align-items-center text-decoration-none text-dark position-relative"
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
              <img src={menu.icon} alt={menu.alt} style={{ width: "2rem" }} />
            </div>

            <div>{menu.label}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
