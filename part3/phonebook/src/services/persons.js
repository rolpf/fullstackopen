import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => {
    return response.data;
  });
};

const updatePhone = (id, phoneInput) => {
  return axios
    .patch(`${baseUrl}/${id}`, { phone: `${phoneInput}` })
    .then((response) => {
      return response.data;
    });
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  updatePhone,
  remove,
};
