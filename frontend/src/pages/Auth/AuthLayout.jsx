import "./AuthLayout.css";
import { Outlet } from "react-router";
import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";
import Circles from "../../components/Circles/Circles";

const AuthLayout = () => {
  return (
    <Container>
      <div className="auth-layout">
        <div className="auth-layout__content">
          <Logo link="/" />

          <div className="auth-layout__text">
            <h1>
              A better way to keep your <span>thoughts.</span>
            </h1>

            <p className="lead">
              A simple Markdown notes app for keeping everything in one place.
            </p>
          </div>
        </div>

        <div className="auth-layout__form">
          <Outlet />
        </div>

        <Circles />
      </div>
    </Container>
  );
};

export default AuthLayout;
