import "./LandingNavbar.css";
import Button from "../../../components/Button/Button";
import { Link } from "react-router";
import Container from "../../../components/Container/Container";

const LandingNavbar = () => {
  return (
    <nav className="landing-navbar">
      <Container>
        <Link className="landing-navbar__logo">Notes</Link>

        <ul className="landing-navbar__list">
          <li>
            <Button className="button--outline" text="Log in" link="/login" />
          </li>

          <li>
            <Button
              className="button--primary"
              text="Sign Up"
              link="/register"
            />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default LandingNavbar;
