import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8001/api/v1",
  withCredentials: true,
  credentials: "include",
});
