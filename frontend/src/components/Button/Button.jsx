import "./Button.css";
import { Link } from "react-router";

const Button = ({ text, link, className }) => {
  return link ? (
    <Link className={`button ${className}`} to={link}>
      {text}
    </Link>
  ) : (
    <button className={`button ${className}`}>{text}</button>
  );
};

export default Button;
