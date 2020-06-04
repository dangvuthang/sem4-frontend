import { createContext } from "react";

export default createContext({
  isLogin: false,
  token: null,
  user: null,
  login() {},
  logout() {},
});
