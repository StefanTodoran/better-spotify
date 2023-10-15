import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";

import Logo from "../assets/logo.svg?react";
import BurgerMenu from "../assets/burger-menu.svg?react";
import SearchIcon from "../assets/search-icon.svg";
import LibraryIcon from "../assets/album-icon.svg";
import FriendsIcon from "../assets/friends-icon.svg";
import HelpIcon from "../assets/help-icon.svg";
import AuthIcon from "../assets/auth-icon.svg";
import "../styles/Header.css";

interface Props {
  authenticated: boolean,
}

export default function Header({
  authenticated
}: Props) {
  const navigate = useNavigate();

  // [ ====================== ] \\
  // OPEN & CLOSE MENU DROPDOWN \\

  const [menuOpen, setMenuOpen] = useState(false);
  const menuDropdown = useRef<HTMLElement>(null);
  const menuBurger = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutsideMenu(event: MouseEvent) {
      const clickTarget = event.target as Node;
      const menuDropdownClicked = menuDropdown.current?.contains(clickTarget);
      const menuBurgerClicked = menuBurger.current?.contains(clickTarget);

      if (!menuOpen && menuBurgerClicked) {
        setMenuOpen(true);
        return;
      }

      if (menuOpen && (menuBurgerClicked || !menuDropdownClicked)) {
        // setTimeout(() => {
        setMenuOpen(false);
        // }, 100);
        return;
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu); // Bind the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu); // Unbind the event listener on clean up
    };
  }, [menuOpen, menuDropdown]);

  useEffect(() => {
    setMenuOpen(false);
  }, [authenticated]);

  // OPEN & CLOSE MENU DROPDOWN \\
  // [ ====================== ] \\

  const [headerHeight, setHeaderHeight] = useState(0);
  const header = useRef<HTMLDivElement>(null);

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
          <NavButtons displayOn="desktop" authenticated={authenticated} />

          {!authenticated && <HeaderButton
            customClass="header-button primary"
            displayPath="Log In"
          />}

          {authenticated &&
            <>
              <div
                id="burger-menu-container"
                // @ts-expect-error Not sure why it wants a LegacyRef<HTMLDivElement>??
                ref={menuBurger}
              >
                <BurgerMenu
                  id="burger-menu"
                  className={menuOpen ? "open" : "closed"}
                />
              </div>

              <div
                id="menu-dropdown"
                className={menuOpen ? "open" : "closed"}
                // @ts-expect-error Not sure why it wants a LegacyRef<HTMLDivElement>??
                ref={menuDropdown}
              >
                <NavButtons displayOn="mobile" authenticated={authenticated} />
                <HeaderButton
                  customClass="header-button"
                  displayPath="Help"
                  iconSrc={HelpIcon}
                />
                <HeaderButton
                  customClass="header-button"
                  displayPath="Log Out"
                  iconSrc={AuthIcon}
                />
              </div>
            </>
          }
        </div>
      </nav>

      {/* HEADER PADDING */}
      <div id="header-spaceholder" style={{ height: headerHeight }}></div>
    </>
  );
}

function NavButtons({ displayOn, authenticated }: { displayOn: string, authenticated: boolean }) {
  return (
    <>
      <HeaderButton
        customClass={"header-button " + displayOn}
        displayPath="Search"
        iconSrc={SearchIcon}
        disabled={!authenticated}
      />
      <HeaderButton
        customClass={"header-button " + displayOn}
        displayPath="Library"
        iconSrc={LibraryIcon}
        disabled={!authenticated}
      />
      <HeaderButton
        customClass={"header-button " + displayOn}
        displayPath="Friends"
        iconSrc={FriendsIcon}
        disabled={!authenticated}
      />
    </>
  );
}