import "./Sidebar.css";
import { NavLink } from "react-router";
import { NotebookPen, Star, Tags, UserRound } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/notes" className="sidebar__link" aria-label="Notes">
        <NotebookPen />
      </NavLink>
      <NavLink to="/tags" end className="sidebar__link" aria-label="Tags">
        <Tags />
      </NavLink>
      <NavLink
        to="/favourites"
        end
        className="sidebar__link"
        aria-label="Favourites"
      >
        <Star />
      </NavLink>
      <NavLink to="/profile" end className="sidebar__link" aria-label="Profile">
        <UserRound />
      </NavLink>
    </div>
  );
};

export default Sidebar;
