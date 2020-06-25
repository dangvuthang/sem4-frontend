import React, { useState, useEffect, useCallback } from "react";
import "./scss/main.scss";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import BannerInfo from "./components/Banner/BannerInfo";
import AuthContext from "./components/shared/context/authContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth } from "./utils/firebase";
import Search from "./components/Search/Search";
import TourList from "./components/Tour/TourList";
import useRequest from "./components/shared/hooks/useRequest";
import TourDetail from "./components/Tour/TourDetail/TourDetail";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Account from "./components/Account/Account";
import Compare from "./components/Compare/Compare";
import Guide from "./components/Guide/Guide";
import NotFound from "./components/NotFound/NoutFound";
function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, isError, sendRequest, clearError] = useRequest();
  const [tourTypes, setTourTypes] = useState([]);
  const [chosenTour, setChosenTour] = useState([]);
  const login = useCallback((token, user) => {
    setToken(token);
    setUser(user);
    if (!localStorage.getItem("travelToVNData"))
      toast.success("Successfully Login");
    localStorage.setItem("travelToVNData", JSON.stringify({ user, token }));
  }, []);

  const logout = useCallback(() => {
    auth.signOut();
    setUser(null);
    setToken(null);
    localStorage.removeItem("travelToVNData");
    toast.success("Successfully Logout");
  }, []);

  useEffect(() => {
    const getTourTypes = async () => {
      const data = await sendRequest(
        `${process.env.REACT_APP_END_POINT}/api/v1/tour-types`
      );
      if (data) setTourTypes(data);
    };
    getTourTypes();
  }, [sendRequest]);

  useEffect(() => {
    if (localStorage.getItem("travelToVNData")) {
      const { token, user } = JSON.parse(
        localStorage.getItem("travelToVNData")
      );
      login(token, user);
    }
  }, [login]);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async authUser => {
      if (authUser && !localStorage.getItem("travelToVNData")) {
        const data = await sendRequest(
          `${process.env.REACT_APP_END_POINT}/api/v1/users/signinWithGoogle`,
          "POST",
          { "Content-Type": "application/json" },
          JSON.stringify({
            email: authUser.email,
            name: authUser.displayName,
            phone: authUser.phoneNumber,
            avatarImage: authUser.photoURL,
            providerKey: authUser.uid,
          })
        );
        if (data) {
          console.log(data);
          const { email, name, avatarImage } = data;
          login(data.jwt, { email, name, avatarImage });
        } else auth.signOut();
      }
    });
    return authListener;
  }, [login, sendRequest]);

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isLogin: !!user }}
    >
      <ToastContainer
        style={{ fontSize: "1.6rem", textAlign: "center" }}
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />
      <Router>
        <Header tourTypes={tourTypes} />
        <Switch>
          <Route path="/" exact>
            <Banner />
            <Search tourTypes={tourTypes} />
          </Route>
          <Route path="/tours" exact>
            <BannerInfo />
            <TourList />
          </Route>
          <Route path="/tours/:tourId">
            <TourDetail setChosenTour={setChosenTour} chosenTour={chosenTour} />
          </Route>
          <Route path="/guides/:guideId">
            <Guide />
          </Route>
          <Route path="/compare">
            <BannerInfo />
            <Compare setChosenTour={setChosenTour} chosenTour={chosenTour} />
          </Route>
          <Route path="/signup">
            <BannerInfo />
          </Route>
          <Route path="/account">
            <BannerInfo />
            <Account />
          </Route>
          <Route path="/not-found" exact>
            <BannerInfo />
            <NotFound />
          </Route>
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
