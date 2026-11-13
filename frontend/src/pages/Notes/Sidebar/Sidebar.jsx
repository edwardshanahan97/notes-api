import "./Sidebar.css";
import { NavLink } from "react-router";
import { NotebookPen, Star, Tags, UserRound, LogOut } from "lucide-react";
import handleLogout from "../../../utils/logout";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__group">
        <NavLink to="/notes" className="sidebar__link" aria-label="Notes">
          <NotebookPen />
        </NavLink>
        <NavLink to="/tags" end className="sidebar__link" aria-label="Tags">
          <Tags />
        </NavLink>
        <NavLink
          to="/favorites"
          end
          className="sidebar__link"
          aria-label="favorites"
        >
          <Star />
        </NavLink>
        <NavLink
          to="/profile"
          end
          className="sidebar__link"
          aria-label="Profile"
        >
          <UserRound />
        </NavLink>
      </div>

      <NavLink
        to="/login"
        end
        className="sidebar__link"
        aria-label="Logout"
        onClick={handleLogout}
      >
        <LogOut />
      </NavLink>
    </div>
  );
};

export default Sidebar;
