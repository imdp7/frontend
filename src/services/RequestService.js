import http from "../http-common";

const getAll = () => {
  return http.get("/request");
};

const create = data => {
  return http.post("/request", data);
};

const get = id => {
  return http.get(`/request/${id}`);
};


const update = (ssn, data) => {
  return http.put(`/request/${ssn}`, data);
};

const remove = ssn => {
  return http.delete(`/request/${ssn}`);
};

const removeAll = () => {
  return http.delete(`/request`);
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