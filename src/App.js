import React, { useState, useEffect, useCallback } from "react";
import "./scss/main.scss";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import BannerInfo from "./components/Banner/BannerInfo";
import AuthContext from "./components/shared/context/authContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./utils/firebase";
import Search from "./components/Search/Search";
function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const login = useCallback((token, user) => {
    setToken(token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      authUser ? setUser(authUser) : setUser(null);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isLogin: !!user }}
    >
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Banner />
            <Search />
          </Route>
          <Route path="/tours">
            <BannerInfo />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
