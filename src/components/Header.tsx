import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";

import Logo from "../assets/logo.svg?react";
import BurgerMenu from "../assets/burger-menu.svg?react";
import SearchIcon from "../assets/search-icon.svg";
import LibraryIcon from "../assets/album-icon.svg";
import FriendsIcon from "../assets/friends-icon.svg";
import "../styles/Header.css";

interface Props {
  authenticated: boolean,
}

export default function Header({
  authenticated
}: Props) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const [headerHeight, setHeaderHeight] = useState(0);
  const header = useRef<HTMLElement>(null);

  function handleResize() {
    if (!header.current) return;
    setHeaderHeight(header.current.clientHeight);
  }

  useEffect(() => {
    // Initial height calculation on mount
    handleResize();
    setTimeout(handleResize, 1000);

    let debounceTimeoutId: number;
    function debounceEventHandler(evt: any, func: (evt: any) => void, delay: number) {
      clearTimeout(debounceTimeoutId);
      debounceTimeoutId = setTimeout(() => func(evt), delay);
    }

    const debouncedHandleResize = (evt: any) => { debounceEventHandler(evt, handleResize, 300) };
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return (
    <>
      <nav ref={header}>
        <a
          tabIndex={0}
          className="branding"
          onClick={() => {
            navigate("/");
          }}
        >
          <Logo className="logo" />
          <h1 className="title">Mixify</h1>
        </a>

        {/* NAV BUTTONS */}
        <div className="nav-buttons">
          <HeaderButton
            customClass="header-button"
            displayPath="Search"
            iconSrc={SearchIcon}
            disabled={!authenticated}
            />
          <HeaderButton
            customClass="header-button"
            displayPath="Library"
            iconSrc={LibraryIcon}
            disabled={!authenticated}
            />
          <HeaderButton
            customClass="header-button"
            displayPath="Friends"
            iconSrc={FriendsIcon}
            disabled={!authenticated}
          />

          {!authenticated && <HeaderButton
            customClass="header-button primary"
            displayPath="Log In"
          />}

          {authenticated &&
            <>
              <BurgerMenu
                id="burger-menu"
                className={menuOpen ? "open" : "closed"}
                onClick={toggleMenu}
              />
              <div
                id="menu-dropdown"
                className={menuOpen ? "open" : "closed"}
                onClick={toggleMenu}
              >
                <HeaderButton
                  customClass="header-button"
                  displayPath="Help"
                />
                <HeaderButton
                  customClass="header-button"
                  displayPath="Log Out"
                />
              </div>
            </>
          }
        </div>
      </nav>

      {/* HEADER PADDING */}
      <div style={{ height: headerHeight }}></div>
    </>
  );
}