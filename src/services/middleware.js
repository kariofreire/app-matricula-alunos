import Cookie from "js-cookie";

export default {
  auth(to, from, next) {
    if (!Cookie.get("token")) next("/login");

    next();
  }
}