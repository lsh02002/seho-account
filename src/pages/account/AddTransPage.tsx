import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import styled from "styled-components";
import { AddTransactionApi, GetCategoriesApi } from "../../api/sehomallApi";
import { categoryType, transactionRequestType } from "../../types/type";
import { useLogin } from "../../context/loginContext";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Back from "../../assets/back.svg";
import { useNavigate } from "react-router-dom";

const AddTransPage = () => {
  const navigator = useNavigate();

  const { myBook } = useLogin();
  const typeList = ["INCOME", "EXPENSE"];
  const [type, setType] = useState("INCOME");
  const [selectedCateList, setSelectedCateList] = useState<categoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [todayDate, setTodayDate] = useState(
    format(new Date(), "yyyy. M. d. a h:mm:ss", { locale: ko })
  );
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    GetCategoriesApi()
      .then((res) => {
        console.log(res);

        let list = res?.data;
        list = list?.filter((cate: categoryType) => cate.type === type);
        setSelectedCateList(list);
        
        setSelectedCategory(list[0]?.id);

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
  }, [type]);

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrMessage("");
    setType(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrMessage("");
    setSelectedCategory(parseInt(e.target.value));
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

  const handleRegister = () => {
    setErrMessage("");

    const transaction: transactionRequestType = {
      bookId: myBook?.id ?? 0,
      categoryId: selectedCategory,
      transactionDate: todayDate ?? "",
      amount,
      type,
      note,
      dedupeKey: "",
    };

    AddTransactionApi(transaction)
      .then((res) => {
        console.log(res);
        alert("입력을 성공했습니다.!");

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
        <h3>거래내용 입력</h3>
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
        <SelectInput onChange={handleSelect} value={selectedCategory}>
          {selectedCateList?.map((item: categoryType) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </SelectInput>
        <Label>내용</Label>
        <TextInput type="text" value={note} onChange={handleNoteInput} />
        <ButtonWrapper>
          {errMessage && <ErrorText>{errMessage}</ErrorText>}
          <SaveButton onClick={handleRegister}>저장하기</SaveButton>
        </ButtonWrapper>
      </Wrapper>
    </Layout>
  );
};

export default AddTransPage;

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
`;

const ButtonWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 30px;
`;

const SaveButton = styled.button`
  width: 100px;
  border: none;
  background-color: gray;
  color: white;
  font-size: 1rem;
  padding: 5px;
`;
