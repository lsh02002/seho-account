import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useContext,
} from "react";
import { bookType, categoryType, transactionResponseType } from "../types/type";
import { transactionData } from "../components/data/transactionData";
import { booksData } from "../components/data/booksData";
import { categoriesData } from "../components/data/categoriesData";

export type LoginContextValue = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  myBook: bookType | null;
  setMyBook: Dispatch<SetStateAction<bookType | null>>;
  startDate: Date | null;
  setStartDate: (d: Date | null) => void;
  startMonth: Date | null;
  setStartMonth: (d: Date | null) => void;
  transList: transactionResponseType[];
  setTransList: Dispatch<SetStateAction<transactionResponseType[]>>;
  isDayDate: boolean;
  setIsDayDate: (i: boolean) => void;
  selectedCateList: categoryType[];
  setSelectedCateList: Dispatch<SetStateAction<categoryType[]>>;
  selectedCategory: number;
  setSelectedCategory: (i: number) => void;
};

const LoginContext = createContext<LoginContextValue | undefined>(undefined);

const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [myBook, setMyBook] = useState<bookType | null>(booksData);  
  const [startDate, setStartDate] = useState<Date | null>(new Date("2026-01-10"));
  const [startMonth, setStartMonth] = useState<Date | null>(new Date("2026-01-10"));
  const [transList, setTransList] = useState<transactionResponseType[]>(transactionData?.content);
  const [isDayDate, setIsDayDate] = useState(true);

  const [selectedCateList, setSelectedCateList] = useState<categoryType[]>(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const value: LoginContextValue = {
    isLogin,
    setIsLogin,
    myBook,
    setMyBook,
    startDate,
    setStartDate,
    startMonth,
    setStartMonth,
    transList,
    setTransList,
    isDayDate,
    setIsDayDate,
    selectedCateList,
    setSelectedCateList,
    selectedCategory,
    setSelectedCategory,
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
