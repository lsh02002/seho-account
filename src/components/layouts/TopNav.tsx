import styled from "styled-components";

import Day from "../../assets/day.svg";
import Month from "../../assets/month.svg";
import Calendar from "../../assets/calendar.svg";
import Revenue from "../../assets/revenue.svg";
import Memo from "../../assets/memo.svg";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <Container>
      <Wrapper>
        <IconLink to="/">
          <div>
            <img src={Day} alt="" />
          </div>
          <div>일일</div>
        </IconLink>
        <IconLink to={`/month`}>
          <div>
            <img src={Month} alt="" />
          </div>
          <div>월별</div>
        </IconLink>
        <IconLink to={`/calendar`}>
          <div>
            <img src={Calendar} alt="" />
          </div>
          <div>달력</div>
        </IconLink>
        <IconLink to="/summary">
          <div>
            <img src={Revenue} alt="" />
          </div>
          <div>결산</div>
        </IconLink>
        <IconLink to={`/memo`}>
          <div>
            <img src={Memo} alt="" />
          </div>
          <div>메모</div>
        </IconLink>
      </Wrapper>
    </Container>
  );
};

export default TopNav;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  opacity: 1;
  z-index: 300;
  position: fixed !important;
  top: 50px !important;
  left: 0;
  right: 0;
  margin-top: 10px;  
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 0.8rem;
  background-color: rgba(255, 255, 255, 1);  
  border-bottom: 1px solid lightgray;
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
    width: 1.5rem;
  }
`;
