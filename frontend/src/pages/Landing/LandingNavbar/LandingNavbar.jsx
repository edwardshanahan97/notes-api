import "./LandingNavbar.css";
import Button from "../../../components/Button/Button";
import Logo from "../../../components/Logo/Logo";

const LandingNavbar = () => {
  return (
    <nav className="landing-navbar">
      <Logo link="/" />

      <ul className="landing-navbar__list">
        <li>
          <Button
            className="button--outline button--small"
            text="Log in"
            link="/login"
          />
        </li>

        <li>
          <Button
            className="button--primary button--small"
            text="Sign Up"
            link="/register"
          />
        </li>
      </ul>
    </nav>
  );
};

export default LandingNavbar;
