import { Link } from "react-router-dom";

export default function NotFoundPage({ }) {
  return (
    <div className="main-content">
      <h1>Page Not Found</h1>
      <p>
        The url you entered could not be resolved. Please double check it and 
        try again, or click <Link to="/">here</Link> to go to your homepage.
      </p>
    </div>
  );
}