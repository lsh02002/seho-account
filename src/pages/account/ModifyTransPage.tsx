import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import styled from "styled-components";
import {
  DeleteTransactionApi,
  GetCategoriesApi,
  GetTransactionByBookIdAndTransactionIdApi,
  ModifyTransactionApi,
} from "../../api/sehomallApi";
import {
  categoryType,
  transactionRequestType,
  transactionResponseType,
} from "../../types/type";
import { useLogin } from "../../context/loginContext";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Back from "../../assets/back.svg";

const ModifyTransPage = () => {
  const navigator = useNavigate();
  const { bookId, transactionId } = useParams();
  const { selectMenu } = useLogin();
  const typeList = ["INCOME", "EXPENSE"];
  const [type, setType] = useState("INCOME");
  const [selectCateList, setSelectCateList] = useState<categoryType[]>([]);
  const [selected, setSelected] = useState<number | undefined>(0);
  const [todayDate, setTodayDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    GetCategoriesApi()
      .then((res) => {
        console.log(res);
        setSelectCateList(res.data);

        if (res?.headers?.accesstoken) {
          localStorage.setItem("accessToken", res?.headers?.accesstoken);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.detailMessage) {
          setErrMessage(err.response.data.detailMessage);
        } else {
          setErrMessage(err?.message);
        }
      });
  }, []);

  const setTransaction = useCallback(
    (transaction: transactionResponseType) => {
      setSelected(
        selectCateList?.find((cate) => cate.name === transaction?.categoryName)
          ?.id ?? 0
      );
      setTodayDate(
        format(transaction.transactionDate, "yyyy. M. d. a h:mm:ss", {
          locale: ko,
        })
      );
      setAmount(transaction.amount);
      setType(transaction.type);
      setNote(transaction.note);
    },
    [selectCateList]
  );

  useEffect(() => {
    GetTransactionByBookIdAndTransactionIdApi(
      parseInt(bookId ?? "0"),
      parseInt(transactionId ?? "0")
    )
      .then((res) => {
        console.log(res);
        setTransaction(res?.data);

        if (res?.headers?.accesstoken) {
          localStorage.setItem("accessToken", res?.headers?.accesstoken);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.detailMessage) {
          setErrMessage(err.response.data.detailMessage);
        } else {
          setErrMessage(err?.message);
        }
      });
  }, [bookId, setTransaction, transactionId]);

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrMessage("");
    setType(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrMessage("");
    setSelected(parseInt(e.target.value));
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");
    setTodayDate(e.target.value);
  };

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");
    setAmount(parseFloat(e.target.value));
  };

  const handleNoteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMessage("");
    setNote(e.target.value);
  };

  const handleDelete = () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      return;
    }
    DeleteTransactionApi(
      parseInt(selectMenu?.value ?? "0"),
      parseInt(transactionId ?? "0")
    )
      .then((res) => {
        console.log(res);

        if (res?.headers?.accesstoken) {
          localStorage.setItem("accessToken", res?.headers?.accesstoken);
        }

        navigator("/");
      })
      .catch((err) => {
        if (err?.response?.data?.detailMessage) {
          setErrMessage(err.response.data.detailMessage);
        } else {
          setErrMessage(err?.message);
        }
      });
  };

  const handleRegister = () => {
    setErrMessage("");

    const transaction: transactionRequestType = {
      bookId: parseInt(selectMenu?.value ?? "0"),
      categoryId: selected ?? 0,
      transactionDate: todayDate,
      amount,
      type,
      note,
      dedupeKey: "",
    };

    ModifyTransactionApi(parseInt(transactionId ?? "0"), transaction)
      .then((res) => {
        console.log(res);
        alert("수정을 성공했습니다.!");

        if (res?.headers?.accesstoken) {
          localStorage.setItem("accessToken", res?.headers?.accesstoken);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.detailMessage) {
          setErrMessage(err.response.data.detailMessage);
        } else {
          setErrMessage(err?.message);
        }
      });
  };

  return (
    <Layout>
      <Wrapper>
        <BackImage onClick={()=>navigator(-1)} src={Back} alt="" />
        <h3>거래내용 수정</h3>
        <Label>지출/수입</Label>
        <SelectInput onChange={handleType} value={type}>
          {typeList?.map((type, index) => (
            <option value={type} key={index}>
              {type}
            </option>
          ))}
        </SelectInput>
        <Label>날짜</Label>
        <DateInput type="text" value={todayDate} onChange={handleDateInput} />
        <Label>금액</Label>
        <AmountInput
          type="number"
          value={amount}
          onChange={handleAmountInput}
        />
        <Label>분류</Label>
        <SelectInput onChange={handleSelect} value={selected}>
          {selectCateList
            ?.filter((item) => item.type === type)
            .map((item: categoryType) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
        </SelectInput>
        <Label>내용</Label>
        <TextInput type="text" value={note} onChange={handleNoteInput} />
        {errMessage && <ErrorText>{errMessage}</ErrorText>}
        <ButtonWrapper>
          <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
          <SaveButton onClick={handleRegister}>저장하기</SaveButton>
        </ButtonWrapper>
      </Wrapper>
    </Layout>
  );
};

export default ModifyTransPage;

const Wrapper = styled.div`
  width: 100%;
  padding-top: 50px;
`;

const BackImage = styled.img`
  width: 30px;
`;

const Label = styled.label`
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  margin-top: 5px;
`;

const DateInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
`;

const AmountInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
`;

const SelectInput = styled.select`
  width: 100%;
  display: flex;
  padding: 5px;
`;

const TextInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
`;

const ErrorText = styled.div`
  width: 100%;
  color: red;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 10px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 20px;
`;

const SaveButton = styled.button`
  width: 100px;
  border: none;
  background-color: gray;
  color: white;
  font-size: 1rem;
  padding: 5px;
`;

const DeleteButton = styled.button`
  width: 100px;
  border: none;
  background-color: red;
  color: white;
  font-size: 1rem;
  padding: 5px;
  margin-right: 20px;
`;
