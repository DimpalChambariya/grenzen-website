import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="kicker" style={{ justifyContent: "center" }}>Error 404</p>
      <h1>This page hasn&rsquo;t been synthesised yet.</h1>
      <p className="lede" style={{ margin: "0 auto 24px" }}>
        The page you're looking for doesn't exist. Head back to the product range or home page.
      </p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  );
}
