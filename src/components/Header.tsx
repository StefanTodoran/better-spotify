import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";

import Logo from "../assets/logo.svg?react";
import "../styles/Header.css";

interface Props {
  authenticated: boolean,
}

export default function Header({
  authenticated
}: Props) {
  const navigate = useNavigate();
  
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
            // navigate("/");
          }}
        >
          <Logo className="logo" />
          <h1 className="title">Mixify</h1>
        </a>

        {/* NAV BUTTONS */}
        <div>
          <HeaderButton
            customClass="header-button"
            displayPath="Search"
            disabled={!authenticated}
          />
          <HeaderButton
            customClass="header-button"
            displayPath="Library"
            disabled={!authenticated}
          />
          <HeaderButton
            customClass="header-button"
            displayPath="Friends"
            disabled={!authenticated}
          />

          {
            authenticated ?
              <HeaderButton
                customClass="header-button"
                displayPath="Log Out"
              /> :
              <HeaderButton
                customClass="header-button primary"
                displayPath="Log In"
              />
          }
        </div>
      </nav>

      {/* HEADER PADDING */}
      <div style={{ height: headerHeight }}></div>
    </>
  );
}