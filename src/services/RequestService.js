import http from "../http-common";

const getAll = () => {
  return http.get("/request");
};

const create = data => {
  return http.post("/request", data);
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  //get,
  // update,
  // remove,
  // removeAll,
  // findByTransaction
};