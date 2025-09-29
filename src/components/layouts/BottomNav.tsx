import styled from "styled-components";

import Account from "../../assets/account.svg";
import Statics from "../../assets/statics.svg";
import MyPage from "../../assets/my-page.svg";
import Cart from "../../assets/cart.svg";
import { Link } from "react-router-dom";

const BottomNav = () => {

  return (
    <Container>
      <Wrapper>
        <IconLink to="/">
          <div>
            <img src={Account} alt="" />
          </div>
          <div>가계부</div>
        </IconLink>
        <IconLink to={`/statics`}>
          <div>
            <img src={Statics} alt="" />
          </div>
          <div>통계</div>
        </IconLink>
        <IconLink to={`/mypage/REVIEWS?page=1&size=4`}>
          <div>
            <img src={MyPage} alt="" />
          </div>
          <div>마이페이지</div>
        </IconLink>
        {/* {!isLogin ? (
          <>            
            <IconLink to="/login">
              <div>
                <img src={Login} alt="" />
              </div>
              <div>LOGIN</div>
            </IconLink>
          </>
        ) : (
          <>
            <IconLink onClick={OnLogout} to={""}>
              <div>
                <img src={Logout} alt="" />
              </div>
              <div>LOGOUT</div>
            </IconLink>
          </>
        )} */}
        <>
          {/* <Link to="/pay">PAY</Link> */}
          <IconLink
            to="/cart"           
          >
            <div>
              <img src={Cart} alt="" />              
            </div>
            <div>장바구니</div>
          </IconLink>          
        </>
      </Wrapper>
    </Container>
  );
};

export default BottomNav;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  opacity: 1;
  z-index: 200;
  border-top: 1px solid lightgray;
  position: fixed !important;
  bottom: 0 !important;
  left: 0;
  right: 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 70px;
  font-size: 0.8rem;
  background-color: rgba(255, 255, 255, 1);
  a {
    text-decoration: none;
    color: black;
  }
  span {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: gray;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 14px;
    padding-left: 2px;
    position: absolute;
  }
`;

const IconLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 2rem;
  }
`;
