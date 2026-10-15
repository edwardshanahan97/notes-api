import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      navigate("/notes", { replace: true });
    } catch (error) {
      console.error("Request Failed: " + error);

      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>Welcome back</h2>

      <p className="lead">Log in to access your notes.</p>

      <form onSubmit={handleSubmit} className="form">
        <Input name="email" type="email" placeholder="Email" />

        <Input name="password" type="password" placeholder="Password" />

        {error && <p className="form__error">{error}</p>}

        <Button
          text={isLoading ? "Logging In" : "Login"}
          className="button--primary button--large"
          type="submit"
          disabled={isLoading}
        />
      </form>

      <Link to="/register" className="form__link">
        Don't have an account? <span>Sign up</span>
      </Link>
    </div>
  );
};

export default LoginPage;
