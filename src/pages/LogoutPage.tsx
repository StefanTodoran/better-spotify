import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { outletContext } from "../App";

export default function LogoutPage() {
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [_baseUrl, _authToken, setAuthToken]: outletContext = useOutletContext();

  useEffect(() => {
    setTimeout(() => {
      setAuthToken(null);
      setLogoutSuccess(true);
    }, 300 + (Math.random() * 300)); // Just for funsies :)
  }, [logoutSuccess]);

  return (
    <div className="main-content">
      <h1>Logging out...</h1>

      {!logoutSuccess && <p>
        Currently in the process of logging you out. Please wait.
      </p>}
      {logoutSuccess && <p>
        Successfully logged out. Redirecting you to the login page.
      </p>}
    </div>
  );
}