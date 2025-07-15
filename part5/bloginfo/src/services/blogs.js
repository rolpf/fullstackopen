import axios from "axios";
let baseUrl = "";

if (process.env.NODE_ENV === "prod") {
  baseUrl = "/api/blogs";
} else {
  baseUrl = "http://localhost:3001/api/blogs";
  console.log("dev env");
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };
