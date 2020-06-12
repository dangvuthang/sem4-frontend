import React, { useState, useEffect, useCallback } from "react";
import "./scss/main.scss";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import BannerInfo from "./components/Banner/BannerInfo";
import AuthContext from "./components/shared/context/authContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./utils/firebase";
import Search from "./components/Search/Search";
import TourList from "./components/Tour/TourList";
import useRequest from "./components/shared/hooks/useRequest";
import TourDetail from "./components/Tour/TourDetail/TourDetail";
function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const login = useCallback((token, user) => {
    setToken(token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    auth.signOut();
    setUser(null);
    setToken(null);
  }, []);

  useEffect(() => {
    setToken(123);
    setUser("vuthang@gmail.com");
    // auth.onAuthStateChanged(async authUser => {
    //   if (authUser) {
    //     const data = await sendRequest(
    //       `${process.env.REACT_APP_END_POINT}/api/v1/users/signinWithGoogle`,
    //       "POST",
    //       { "Content-Type": "application/json" },
    //       JSON.stringify({
    //         email: authUser.email,
    //         name: authUser.displayName,
    //         phone: authUser.phoneNumber,
    //         avatarImage: authUser.photoURL,
    //         providerKey: authUser.uid,
    //       })
    //     );
    //     if (data) login(data.jwt, data.email);
    //     else auth.signOut();
    //   }
    // });
  }, [login, sendRequest]);

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
          <Route path="/tours" exact>
            <BannerInfo />
            <Search />
            <TourList />
          </Route>
          <Route path="/tours/:id">
            <TourDetail />
          </Route>
          <Route path="/destination">
            <BannerInfo />
          </Route>
          <Route path="/signup">
            <BannerInfo />
          </Route>
          <Route path="/user/:id">
            <BannerInfo />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
