import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div>
      <h2>Welcome back</h2>

      <p className="lead">Log in to access your notes.</p>

      <form className="form">
        <Input name="email" type="email" placeholder="Email" />

        <Input name="password" type="password" placeholder="Password" />

        <Button text="Sign Up" className="button--primary button--large" />

        <Link to="/register" className="form__link">
          Don't have an account? <span>Sign up</span>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
