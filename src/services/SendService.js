import http from "../http-common";

const getAll = () => {
  return http.get("/send");
};
const create = data => {
  return http.post("/send", data);
};
const get = account_no => {
  return http.get(`/tutorials/${account_no}`);
};

const update = (account_no, data) => {
  return http.put(`/tutorials/${account_no}`, data);
};

const remove = account_no => {
  return http.delete(`/tutorials/${account_no}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTransaction = transaction => {
  return http.get(`/tutorials?transaction=${transaction}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  //update,
  // remove,
  // removeAll,
  // findByTransaction
};