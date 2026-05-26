import React, { useEffect, useMemo, useState } from "react";
import { categoryType, transactionResponseType } from "../../types/type";
import { useLogin } from "../../context/loginContext";
import Back from "../../assets/back.svg";
import { useNavigate } from "react-router-dom";

const AddTransPage = () => {
  const navigator = useNavigate();

  const { myBook } = useLogin();
  const typeList = ["INCOME", "EXPENSE"];
  const [type, setType] = useState("INCOME");

  const { transList, setTransList } = useLogin();

  const { selectedCateList } = useLogin();
  const { selectedCategory, setSelectedCategory } = useLogin();

  const [todayDate, setTodayDate] = useState(new Date().toISOString());
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  const [errMessage, setErrMessage] = useState("");

  const filteredCateList = useMemo(
    () => (selectedCateList ?? []).filter((c) => c.type === type),
    [selectedCateList, type],
  );

  useEffect(() => {
    setSelectedCategory(filteredCateList[0]?.id);
  }, [filteredCateList, setSelectedCategory]);

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

  const handleNoteInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrMessage("");
    setNote(e.target.value);
  };

  const handleRegister = () => {
    setErrMessage("");

    const transaction: transactionResponseType = {
      id: (transList[transList.length - 1]?.id ?? 0) + 1,
      bookId: myBook?.id ?? 0,
      categoryName:
        filteredCateList?.find((cate) => cate.id === selectedCategory)?.name ??
        "",
      transactionDate: todayDate ?? "",
      amount,
      type,
      note,
      dedupeKey: "",
    };

    setTransList((prev) => [...prev, transaction]);

    console.log(transaction);
  };

  return (
    <div className="m-3" style={{boxSizing: "border-box"}}>
      <img
        onClick={() => navigator(-1)}
        src={Back}
        alt="뒤로가기"
        style={{
          width: "30px",
          cursor: "pointer",
        }}
      />

      <h3 className="mt-3 mb-3">거래내용 입력</h3>

      <label className="form-label mt-1">지출/수입</label>
      <select className="form-select" onChange={handleType} value={type}>
        {typeList?.map((type, index) => (
          <option value={type} key={index}>
            {type}
          </option>
        ))}
      </select>

      <label className="form-label mt-2">날짜</label>
      <input
        className="form-control"
        type="text"
        value={todayDate}
        onChange={handleDateInput}
      />

      <label className="form-label mt-2">금액</label>
      <input
        className="form-control"
        type="number"
        value={amount}
        onChange={handleAmountInput}
      />

      <label className="form-label mt-2">분류</label>
      <select
        className="form-select"
        onChange={handleSelect}
        value={selectedCategory}
      >
        {filteredCateList?.map((item: categoryType) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <label className="form-label mt-2">내용</label>
      <textarea
        className="form-control"
        value={note}
        onChange={handleNoteInput}
        rows={2}
      />

      <div className="w-100 d-flex flex-column align-items-end mt-4">
        {errMessage && (
          <div className="w-100 text-danger text-center mb-2">{errMessage}</div>
        )}

        <button
          className="btn btn-secondary"
          style={{ width: "100px" }}
          onClick={handleRegister}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default AddTransPage;
