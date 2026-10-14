import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Link } from "react-router";

const Register = () => {
  return (
    <div>
      <h2>Create your free account</h2>

      <p className="lead">Get started with Notes for free.</p>

      <form className="form">
        <Input name="name" type="text" placeholder="Name" />

        <Input name="email" type="email" placeholder="Email" />

        <Input name="password" type="password" placeholder="Password" />

        <Button text="Sign Up" className="button--primary button--large" />
      </form>

      <Link to="/login" className="form__link">
        Already have an account? <span>Log in</span>
      </Link>
    </div>
  );
};

export default Register;
