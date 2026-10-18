import "./NotesLayout.css";
import { Outlet } from "react-router";
import BottomNavbar from "./BottomNavbar/BottomNavbar";

const NotesLayout = () => {
  return (
    <main className="notes-layout">
      <Outlet />
      <BottomNavbar />
    </main>
  );
};

export default NotesLayout;
