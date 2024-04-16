import { useState } from "react";
import API from "../../api";

/* eslint-disable react/prop-types */
const TransferMoney = ({ userId , setIsOpen}) => {
  const [amount, setAmount] = useState(0);
  const transferMoney = async (userId) => {
    try {
     const res =  await API.post("/account/transfer", {
        to: userId,
        amount,
      });
     if(res.status === 200){
      setIsOpen(false)
     }
    } catch (error) {
      console.error(error);
    }
  };

  function ammountHandler(e) {
    e.preventDefault();
    const value = e.target.value;
    setAmount(value);
  }

  return (
    <>
      <div className="mb-4">
        <input
          value={amount}
          onChange={ammountHandler}
          placeholder="Enter amount"
          className="outline-1 rounded w-full p-2"
          type="text"
        />
      </div>
      <button
        onClick={() => transferMoney(userId)}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Initiate Transfer
      </button>
    </>
  );
};

export default TransferMoney;
