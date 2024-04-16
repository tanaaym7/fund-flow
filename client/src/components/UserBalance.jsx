import { useState, useEffect } from "react";
import API from "../api";

const UserBalance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await API.get("/account/balance");
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return balance !== null ? (
    <div>
      <p className="text-xl font-semibold">
        Your Balance: <span className="text-green-600">${balance}</span>{" "}
      </p>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default UserBalance;
