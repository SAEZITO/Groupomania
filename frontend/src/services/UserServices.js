import Api from "@/services/Api";

export default {
  deleteAccount(id, data) {
    return Api().delete("auth/accounts/" + id, data);
  },
  getAllUsers(data) {
    return Api().get("auth/accounts/", data);
  },
  getOneUser(id) {
    return Api().get("auth/accounts/" + id);
  },
  updateUser(id, data) {
    return Api().put("auth/accounts/" + id, data);
  },
};
