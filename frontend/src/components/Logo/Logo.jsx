import "./Logo.css";
import { Link } from "react-router";

const Logo = ({ link }) => {
  return (
    <Link to={link} className="logo">
      Notes
    </Link>
  );
};

export default Logo;
