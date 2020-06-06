import React, { useRef, useEffect } from "react";
import SocialMediaNav from "./SocialMediaNav/SocialMediaNav";
import MainNav from "./MainNav/MainNav";
const Header = props => {
  const mainNavigation = useRef(null);
  const header = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting)
          mainNavigation.current.classList.add("sticky");
        else mainNavigation.current.classList.remove("sticky");
      });
    });
    observer.observe(header.current);
    return () => observer.disconnect();
  }, [header, mainNavigation]);

  return (
    <header ref={header}>
      <SocialMediaNav />
      <MainNav reference={mainNavigation} />
    </header>
  );
};

export default Header;
