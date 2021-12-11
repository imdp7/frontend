import http from "../http-common";

const getAll = () => {
  return http.get("/user");
};

const get = account_no => {
  return http.get(`/user/${account_no}`);
};

const create = data => {
  return http.post("/user", data);
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  get,
  create,
  // update,
  // remove,
  // removeAll,
  // findByTransaction
};