import axios from "axios";
let baseUrl = "";

if (process.env.NODE_ENV === "prod") {
  baseUrl = "/api/blogs";
} else {
  baseUrl = "http://localhost:3001/api/blogs";
  console.log("dev env");
}

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("token " + token);

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updatedBlog) => {
  const response = await axios.patch(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog
  );
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, remove, setToken };
