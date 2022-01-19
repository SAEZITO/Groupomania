import Api from "@/services/Api";

export default {
  getAllPosts(data) {
    return Api().get("posts/", data);
  },
  getOnePost(id, data) {
    return Api().get("posts/" + id, data);
  },
  createPost(data) {
    return Api().post("posts/", data);
  },
  modifyPost(id, data) {
    return Api().put("posts/" + id, data);
  },
  deletePost(id, data) {
    return Api().delete("posts/" + id, data);
  },
  createComment(data) {
    return Api().post("comment", data);
  },
  deleteComment(id, data) {
    return Api().delete("comment/" + id, data);
  },
};
