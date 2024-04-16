/* eslint-disable react/prop-types */
import { useState } from "react";
import TransferModel from "../components/transfer/TrasnferModel";

const Transfer = ({ userId }) => {
  const [clicked, setClicked] = useState(false);

  function handleTransfer() {
    setClicked((prev) => !prev);
  }

  return (
    <div>
      <button
        onClick={handleTransfer}
        className="py-2 px-4 bg-violet-600 hover:bg-violet-800 rounded-lg"
      >
        Send Money
      </button>

      {clicked && <TransferModel userId={userId} setClicked={setClicked} />}
    </div>
  );
};

export default Transfer;
