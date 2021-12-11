import http from "../http-common";

const getAll = () => {
  return http.get("/request");
};
const create = data => {
  return http.post("/request", data);
};
const get = account_no => {
  return http.get(`/request/${account_no}`);
};

const update = (account_no, data) => {
  return http.put(`/request/${account_no}`, data);
};

const remove = account_no => {
  return http.delete(`/request/${account_no}`);
};

const removeAll = () => {
  return http.delete(`/request`);
};

const findByTransaction = transaction => {
  return http.get(`/request?transaction=${transaction}`);
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