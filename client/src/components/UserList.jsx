/* eslint-disable react/prop-types */
import { useState } from "react";
import API from "../api";
import ProfileCircle from "./ProfileCircle";
import Transfer from "./Transfer";

const UserList = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  const handleFilterChange = async (e) => {
    e.preventDefault();
    const value = e.target.value.trim();
    if (!value) {
      setFilter("");
      setUsers([]);
      return;
    }
    setFilter(value);

    try {
      const response = await API.get("/user/bulk", {
        params: {
          filter: value,
        },
      });
      setUsers(response.data.user);
    } catch (error) {
      console.error("error getting users:", error);
    }
  };

  return (
    <div className="mt-5">
      <input
        className="py-1 px-2 rounded-lg outline-none"
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />

      {users.length > 0 && (
        <div className="mt-5">
          <h1 className="text-xl">Send to:- </h1>
          <ul className="">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center mt-5"
              >
                <div className="flex items-center gap-3">
                  <ProfileCircle initial={user.name[0]} />
                  <li className="py-2 capitalize text-lg font-semibold">
                    {user.name}
                  </li>
                </div>
                <Transfer userId={user._id} />
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;
