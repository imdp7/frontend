import http from "../http-common";

const getAll = () => {
  return http.get("/send");
};

const create = data => {
  return http.post("/send", data);
};

const get = ssn => {
  return http.get(`/send/${ssn}`);
};

const update = (ssn, data) => {
  return http.put(`/send/${ssn}`, data);
};

const remove = ssn => {
  return http.delete(`/send/${ssn}`);
};

const removeAll = () => {
  return http.delete(`/send`);
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