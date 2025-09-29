import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useContext,
} from "react";
import { bookType, selectMenuType, transactionResponseType } from "../types/type";

export type LoginContextValue = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  myBooks: bookType[];
  setMyBooks: Dispatch<SetStateAction<bookType[]>>;
  selectMenu: selectMenuType | null;
  setSelectMenu: Dispatch<SetStateAction<selectMenuType | null>>;
  startDate: Date | null;
  setStartDate: (d: Date | null) => void;
  startMonth: Date | null;
  setStartMonth: (d: Date | null) => void;
  transList: transactionResponseType[];
  setTransList: (tl: transactionResponseType[]) => void;
  isDayDate: boolean;
  setIsDayDate: (i: boolean) => void;
};

const LoginContext = createContext<LoginContextValue | undefined>(undefined);

const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [myBooks, setMyBooks] = useState<bookType[]>([]);
  const [selectMenu, setSelectMenu] = useState<selectMenuType | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startMonth, setStartMonth] = useState<Date | null>(new Date());
  const [transList, setTransList] = useState<transactionResponseType[]>([]);
  const [isDayDate, setIsDayDate] = useState(true);  

  const value: LoginContextValue = {
    isLogin,
    setIsLogin,
    myBooks,
    setMyBooks,
    selectMenu,
    setSelectMenu,
    startDate,
    setStartDate,
    startMonth,
    setStartMonth,
    transList,
    setTransList,
    isDayDate,
    setIsDayDate,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };

export function useLogin() {
  const ctx = useContext(LoginContext);

  if (!ctx) throw new Error("useLogin must be used within <LoginProvider>");
  return ctx;
}
