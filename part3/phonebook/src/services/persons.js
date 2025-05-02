import axios from "axios";
const baseUrl = "/api/persons";

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
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log("no response received", error.request);
      } else {
        console.log(
          "Something happened in setting up the request that triggered an Error",
          error.message
        );
      }
      console.log(error.config);
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
