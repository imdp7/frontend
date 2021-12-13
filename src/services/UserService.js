import http from "../http-common";

const getAll = () => {
  return http.get("/user");
};

const create = data => {
  return http.post("/user", data);
};

const get = ssn => {
  return http.get(`/user/${ssn}`);
};

const update = (ssn, data) => {
  return http.put(`/user/${ssn}`, data);
};

const remove = ssn => {
  return http.delete(`/user/${ssn}`);
};

const removeAll = () => {
  return http.delete(`/user`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  get,
  update,
  remove,
  removeAll,
  // findByTransaction
};