import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-20">
      <div>
        <Link to="/">
          <img className="h-12 object-cover" src={logo} alt="logo" />
        </Link>
      </div>

      <div className="flex gap-20 text-xl">
        <Link to="/signup">Sign-up</Link>
        <Link to="/signin">Sign-in</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
};

export default Navbar;
