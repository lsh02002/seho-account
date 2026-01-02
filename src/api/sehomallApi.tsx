import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { transactionRequestType, userSignupType } from "../types/type";

const UserLoginApi = async (email: string, password: string) => {
  return axios.post(`${BASE_URL}/user/login`, {
    email,
    password,
  });
};

const UserSignupApi = async (userInfo: userSignupType) => {
  return axios.post(`${BASE_URL}/user/sign-up`, userInfo);
};

const UserLogoutApi = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.delete(`${BASE_URL}/user/logout`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetUserInfoApi = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/user/info`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetUserBookApi = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/api/books/user`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetCategoriesApi = async () => {
  return axios.get(`${BASE_URL}/api/categories`);
};

const AddTransactionApi = async (item: transactionRequestType) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.post(`${BASE_URL}/api/transactions`, item, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetTransactionsApi = async (bookId: number) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/api/transactions/books/${bookId}?page=0&size=3000`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const GetTransactionByBookIdAndTransactionIdApi = (
  bookId: number,
  transactionId: number
) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.get(`${BASE_URL}/api/transactions/${bookId}/${transactionId}`, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const ModifyTransactionApi = (
  transactionId: number,
  item: transactionRequestType
) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.put(`${BASE_URL}/api/transactions/${transactionId}`, item, {
    headers: {
      accessToken,
      refreshToken,
    },
  });
};

const DeleteTransactionApi = (bookId: number, transactionId: number) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios.delete(
    `${BASE_URL}/api/transactions/${bookId}/${transactionId}`,
    {
      headers: {
        accessToken,
        refreshToken,
      },
    }
  );
};

export {
  UserLoginApi,
  UserLogoutApi,
  UserSignupApi,
  GetUserInfoApi,
  GetUserBookApi,
  GetCategoriesApi,
  AddTransactionApi,
  GetTransactionsApi,
  GetTransactionByBookIdAndTransactionIdApi,
  ModifyTransactionApi,
  DeleteTransactionApi,
};
