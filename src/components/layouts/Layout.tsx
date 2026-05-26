import React from "react";
import Header from "./Header";
import SlidePanel from "./SlidePanel";
import { useLogin } from "../../context/loginContext";
import ModifyTransPage from "../../pages/account/ModifyTransPage";
import AddTransPage from "../../pages/account/AddTransPage";
import { useModalManager } from "../../context/ModalContext";

const Layout = ({
  isTopNav = false,
  children,
}: {
  isTopNav?: boolean;
  children: React.ReactNode;
}) => {
  const { transactionId } = useLogin();
  const { openModal, hasOpenModal } = useModalManager();

  const handleAddTrans = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openModal("transadd");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 p-4"
      style={{
        paddingBottom: "100px",
      }}
    >
      {isTopNav && <Header />}

      <SlidePanel title="거래내역 수정" zIndex={200} name="transmodify">
        <ModifyTransPage transModalId={transactionId ?? 0} />
      </SlidePanel>

      <SlidePanel title="거래내역 기입" zIndex={200} name="transadd">
        <AddTransPage />
      </SlidePanel>

      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={isTopNav ? { paddingTop: "80px" } : {}}
      >
        {children}
      </div>

      {isTopNav && !hasOpenModal && (
        <button
          onClick={handleAddTrans}
          className="btn position-fixed rounded-circle"
          style={{
            width: "60px",
            height: "60px",
            right: "10px",
            bottom: "80px",
            zIndex: 200,
            backgroundColor: "lightblue",
            border: "none",
            fontSize: "25px",
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

export default Layout;
