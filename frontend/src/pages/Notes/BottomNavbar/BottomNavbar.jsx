import "./BottomNavbar.css";
import { NavLink } from "react-router";
import { NotebookPen, Star, Tags, UserRound } from "lucide-react";

const BottomNavbar = () => {
  return (
    <nav className="bottom-navbar">
      <NavLink to="/notes" className="bottom-navbar__link" aria-label="Notes">
        <NotebookPen />
      </NavLink>
      <NavLink to="/tags" end className="bottom-navbar__link" aria-label="Tags">
        <Tags />
      </NavLink>
      <NavLink
        to="/favourites"
        end
        className="bottom-navbar__link"
        aria-label="Favourites"
      >
        <Star />
      </NavLink>
      <NavLink
        to="/profile"
        end
        className="bottom-navbar__link"
        aria-label="Profile"
      >
        <UserRound />
      </NavLink>
    </nav>
  );
};

export default BottomNavbar;
