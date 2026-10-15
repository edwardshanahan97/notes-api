import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        setError(data.error);
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Request Failed: " + error);

      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>Create your free account</h2>

      <p className="lead">Get started with Notes for free.</p>

      <form onSubmit={handleSubmit} className="form">
        <Input name="name" type="text" placeholder="Name" />

        <Input name="email" type="email" placeholder="Email" />

        <Input name="password" type="password" placeholder="Password" />

        {error && <p className="form__error">{error}</p>}

        <Button
          text={isLoading ? "Signing Up" : "Sign Up"}
          className="button--primary button--large"
          type="submit"
          disabled={isLoading}
        />
      </form>

      <Link to="/login" className="form__link">
        Already have an account? <span>Log in</span>
      </Link>
    </div>
  );
};

export default Register;
