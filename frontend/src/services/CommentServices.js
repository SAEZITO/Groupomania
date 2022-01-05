import Api from "@/services/Api";

export default {
  createComment(data) {
    return Api().post("comment", data);
  },
  deleteComment(id) {
    return Api().delete("comment/" + id);
  },
  getComment(postId) {
    return Api().get("comment/" + postId);
  },
  getAComment(id) {
    return Api().get("comment/" + id);
  },
};
