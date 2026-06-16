import React, { useEffect, useMemo, useState } from "react";
import { categoryType, transactionResponseType } from "../../types/type";
import { useNavigate } from "react-router-dom";
import Back from "../../assets/back.svg";
import { useLogin } from "../../context/loginContext";

const ModifyTransPage = ({ transactionId }: { transactionId?: number }) => {
  const navigator = useNavigate();
  const typeList = ["INCOME", "EXPENSE"];
  const [type, setType] = useState("INCOME");

  const { transList, setTransList } = useLogin();

  const { selectedCateList } = useLogin();
  const { myBook } = useLogin();
  const [selected, setSelected] = useState<number | undefined>(0);
  const [todayDate, setTodayDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  const filteredCateList = useMemo(
    () => (selectedCateList ?? []).filter((c) => c.type === type),
    [selectedCateList, type],
  );

  const transaction = useMemo(
    () => transList?.find((t) => t.id === Number(transactionId)),
    [transList, transactionId],
  );

  useEffect(() => {
    if (!transaction) return;

    setType(transaction.type);
    setSelected(
      selectedCateList?.find((cate) => cate.name === transaction.categoryName)
        ?.id ?? 0,
    );

    setTodayDate(new Date(transaction.transactionDate).toISOString());

    setAmount(transaction.amount);
    setNote(transaction.note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transList, transaction]);

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(parseInt(e.target.value));
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodayDate(e.target.value);
  };

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleNoteInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleDelete = () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    setTransList((prev) =>
      prev.filter((trans) => trans.id !== Number(transactionId)),
    );
  };

  const handleRegister = () => {
    const transaction: transactionResponseType = {
      id: Number(transactionId),
      bookId: myBook?.id ?? 0,
      categoryName:
        filteredCateList?.find((cate) => cate.id === selected)?.name ?? "",
      transactionDate: todayDate ?? "",
      amount,
      type,
      note,
      dedupeKey: "",
    };

    setTransList((prev) =>
      prev.map((obj) => (obj.id === Number(transactionId) ? transaction : obj)),
    );
  };

  return (
    <div className="m-3" style={{ boxSizing: "border-box" }}>
      <img
        onClick={() => navigator(-1)}
        src={Back}
        alt="뒤로가기"
        style={{
          width: "30px",
          cursor: "pointer",
        }}
      />

      <h3 className="mt-3 mb-3">거래내용 수정</h3>

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

      <select className="form-select" onChange={handleSelect} value={selected}>
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
        rows={3}
      />

      <div className="w-100 d-flex justify-content-end align-items-center pt-4">
        <button
          className="btn btn-danger me-3"
          style={{
            width: "100px",
          }}
          onClick={handleDelete}
        >
          삭제하기
        </button>

        <button
          className="btn btn-secondary"
          style={{
            width: "100px",
          }}
          onClick={handleRegister}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default ModifyTransPage;
