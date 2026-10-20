import "./NotesLayout.css";
import { Outlet } from "react-router";
import BottomNavbar from "./BottomNavbar/BottomNavbar";
import Sidebar from "./Sidebar/Sidebar";

const NotesLayout = () => {
  return (
    <main className="notes-layout">
      <Sidebar />
      <div className="notes-layout__content">
        <Outlet />
      </div>
      <BottomNavbar />
    </main>
  );
};

export default NotesLayout;
