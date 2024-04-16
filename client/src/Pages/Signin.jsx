import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await API.post("/user/signin", {
        email,
        password,
      });
      setFormData({});
      toast.success("You are Logged in", {
        theme: "light",
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="font-poppins h-[88vh] w-full flex justify-center items-center">
      <div className="p-7 w-full md:w-[45%]">
        <h2 className="text-white text-5xl xl:text-[4rem] leading-none mb-5 xl:mb-16">
          Login
          <br /> to account
        </h2>
        <p className="text-gray-400 mb-10 xl:mb-8 font-semibold">
          Not a member ?&nbsp;&nbsp;
          <Link to="/signup" className="text-[#ff5b31]">
            Register
          </Link>
        </p>
        <form
          onSubmit={loginUser}
          className="space-y-5 xl:space-y-5 w-full xl:w-3/4"
        >
          <input
            className="w-full bg-[#2f2f2f] text-white rounded-full py-3 px-4"
            placeholder="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="w-full bg-[#2f2f2f] text-white rounded-full py-3 px-4"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button className="w-full bg-[#ff5b31] text-white rounded-full py-3 px-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
