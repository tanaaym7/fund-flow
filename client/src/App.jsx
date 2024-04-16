import { Routes, Route } from "react-router-dom";

// Import your components for each route
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-10 px-6">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
