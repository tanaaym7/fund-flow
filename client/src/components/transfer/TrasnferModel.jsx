/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ProfileCircle from "../ProfileCircle";
import TransferMoney from "./TransferMoney";

const TrasnferModel = ({ setClicked, userId }) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
        setClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setClicked]);

  const handleClose = () => {
    setIsOpen(false);
    setClicked(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-600 bg-opacity-40 backdrop-blur-sm z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div
        ref={modalRef}
        className="p-8 rounded-lg shadow-lg w-[400px] bg-gray-900 relative"
      >
        <button
          className="absolute top-0 right-2 hover:text-red-600 text-3xl text-red-400"
          onClick={handleClose}
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-6">Send Money</h1>
        <div className="flex items-center space-x-4 mb-6">
          <ProfileCircle initial="S" />
          <div className="flex flex-col">
            <span className="font-semibold">Friend Name</span>
            <span className="text-sm text-gray-300 font-semibold">
              Amount (in $)
            </span>
          </div>
        </div>
        <TransferMoney setIsOpen={setIsOpen} userId={userId}/>
      </div>
    </div>
  );
};

export default TrasnferModel;
