import Account from "../../assets/account.svg";
import Statics from "../../assets/statics.svg";
import MyPage from "../../assets/my-page.svg";
import Cart from "../../assets/cart.svg";

import { Link } from "react-router-dom";

const BottomNav = () => {
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
          // fontSize: "0.8rem",
        }}
      >
        <Link
          to="/"
          className="d-flex flex-column align-items-center text-decoration-none text-dark"
        >
          <div>
            <img src={Account} alt="가계부" style={{ width: "2rem" }} />
          </div>

          <div>가계부</div>
        </Link>

        <Link
          to="/statics"
          className="d-flex flex-column align-items-center text-decoration-none text-dark"
        >
          <div>
            <img src={Statics} alt="통계" style={{ width: "2rem" }} />
          </div>

          <div>통계</div>
        </Link>

        <Link
          to="/mypage/REVIEWS?page=1&size=4"
          className="d-flex flex-column align-items-center text-decoration-none text-dark"
        >
          <div>
            <img src={MyPage} alt="마이페이지" style={{ width: "2rem" }} />
          </div>

          <div>마이페이지</div>
        </Link>

        <Link
          to="/cart"
          className="d-flex flex-column align-items-center text-decoration-none text-dark position-relative"
        >
          <div>
            <img src={Cart} alt="장바구니" style={{ width: "2rem" }} />
          </div>

          <div>장바구니</div>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
