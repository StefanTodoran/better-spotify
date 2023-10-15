import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function LogoutPage() {
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  // @ts-expect-error
  const [authenticated, setAuthenticated] = useOutletContext();


  useEffect(() => {
    // TODO: make this work
    setTimeout(() => {
      setAuthenticated(false);
      setLogoutSuccess(true);
    }, 500);

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ title: "React POST Request Example" })
    // };

    // fetch("url-goes-here", requestOptions)
    //   .then((response) => {
    //     if (response.ok) setLogoutSuccess(true);
    //   });
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