import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
export default function Signup() {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    try {
      await API.post("/user/signup", {
        name,
        email,
        password,
      });
      setFormData(initialFormData);
      toast.success("You're all set! Log in to continue", {
        theme: "light",
      });
      navigate("/signin");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response received");
      } else {
        toast.error("Request setup error");
      }
    }
  };

  return (
    <div className="h-[88vh] w-full flex justify-center items-center">
      <div className=" p-7 w-full md:w-[42%]">
        <h2 className="text-white text-5xl md:text-[4rem] leading-none mb-5 xl:mb-16">
          Create
          <br /> your account
        </h2>
        <p className="text-gray-400 mb-10 xl:mb-8 font-semibold">
          Already a member?&nbsp;&nbsp;
          <Link to="/signin" className="text-[#ff5b31]">
            Login
          </Link>
        </p>
        <form className="space-y-5 xl:space-y-5 w-full xl:w-3/4">
          <input
            className="w-full bg-[#2f2f2f] text-white rounded-full py-3 px-4"
            type="text"
            placeholder="Enter name..."
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
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
          <button
            type="submit"
            onClick={registerUser}
            className="w-full bg-[#ff5b31] text-white rounded-full py-3 px-4"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
