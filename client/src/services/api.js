import axios from "axios";

const API = axios.create({
  baseURL: "https://backend.jotish.in/backend_dev",
});

// Fetch employee data
export const fetchEmployees = async () => {
  const response = await API.post("/gettabledata.php", {
    username: "test",
    password: "123456",
  });

  return response.data;
};
