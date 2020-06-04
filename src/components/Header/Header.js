import React from "react";
import SocialMediaNav from "./SocialMediaNav/SocialMediaNav";
import MainNav from "./MainNav/MainNav";
const Header = props => {
  return (
    <header>
      <SocialMediaNav />
      <MainNav />
    </header>
  );
};

export default Header;
