export type userSignupType = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

export type bookType = {
  id: number;
  name: string;
  description: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
};

export type selectMenuType = {
  value: string;
  label: string;
};

export type categoryType = {
  id: number;
  name: string;
  parentId: number;
  type: string;
  createdAt: string;
  updateAt: string;
};

export type transactionRequestType = {
  bookId: number;
  categoryId: number;
  transactionDate: string;
  amount: number;
  type: string;
  note: string;
  dedupeKey: string;
};

export type transactionResponseType = {
  id: number;
  bookId: number;
  categoryName: string;
  transactionDate: string;
  amount: number;
  type: string;
  note: string;
  dedupeKey: string;
};
