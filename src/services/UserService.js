import http from "../http-common";

const getAll = () => {
  return http.get("/user");
};

const create = data => {
  return http.post("/user", data);
};

const get = id => {
  return http.get(`/user/${id}`);
};

const update = (id, data) => {
  return http.put(`/user/${id}`, data);
};

const remove = id => {
  return http.delete(`/user/${id}`);
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