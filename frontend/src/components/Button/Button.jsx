import "./Button.css";
import { Link } from "react-router";

const Button = ({ text, link, className, type, disabled }) => {
  return link ? (
    <Link className={`button ${className}`} to={link}>
      {text}
    </Link>
  ) : (
    <button type={type} className={`button ${className}`} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
