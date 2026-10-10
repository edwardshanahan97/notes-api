import "./LandingNavbar.css";
import Button from "../../../components/Button/Button";
import { Link } from "react-router";

const LandingNavbar = () => {
  return (
    <nav className="landing-navbar">
      <Link className="landing-navbar__logo">Notes</Link>

      <ul className="landing-navbar__list">
        <li>
          <Button className="button--text" text="Log in" link="/login" />
        </li>

        <li>
          <Button className="button--primary" text="Sign Up" link="/register" />
        </li>
      </ul>
    </nav>
  );
};

export default LandingNavbar;
