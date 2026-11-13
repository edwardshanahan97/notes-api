import "./BottomNavbar.css";
import { NavLink, useMatch } from "react-router";
import { NotebookPen, Star, Tags, UserRound, LogOut } from "lucide-react";
import handleLogout from "../../../utils/logout";

const BottomNavbar = () => {
  const match = useMatch("/notes/:id");

  return (
    !match && (
      <nav className="bottom-navbar">
        <NavLink to="/notes" className="bottom-navbar__link" aria-label="Notes">
          <NotebookPen />
        </NavLink>
        <NavLink
          to="/tags"
          end
          className="bottom-navbar__link"
          aria-label="Tags"
        >
          <Tags />
        </NavLink>
        <NavLink
          to="/favorites"
          end
          className="bottom-navbar__link"
          aria-label="favorites"
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

        <NavLink
          to="/login"
          end
          className="bottom-navbar__link"
          aria-label="Logout"
          onClick={handleLogout}
        >
          <LogOut />
        </NavLink>
      </nav>
    )
  );
};

export default BottomNavbar;
