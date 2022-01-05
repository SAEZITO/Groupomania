import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Posts from "@/components/Posts.vue";
// import OnePost from "@/components/OnePost.vue";
import Profil from "@/components/Profil.vue";
import Users from "@/components/AllUser.vue";

Vue.use(VueRouter);

const user = JSON.parse(localStorage.getItem("user"));
function guardMyroute(to, from, next) {
  if (user && user.id > 0) {
    next();
  } else {
    next("/");
  }
}
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/posts",
    beforeEnter: guardMyroute,
    name: "Posts",
    component: Posts,
    meta: { title: "Post" },
  },
  {
    path: "/profil/:id",
    beforeEnter: guardMyroute,
    name: "Profil",
    component: Profil,
    meta: { title: "Profil" },
  },
  {
    path: "/users",
    beforeEnter: guardMyroute,
    name: "Users",
    component: Users,
    meta: { title: "User" },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
