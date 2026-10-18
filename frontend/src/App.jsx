import { Route, Routes } from "react-router";
import LandingPage from "./pages/Landing/LandingPage";
import AuthLayout from "./pages/Auth/AuthLayout";
import LoginPage from "./pages/Auth/Login/LoginPage";
import Register from "./pages/Auth/Register/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import NotesLayout from "./pages/Notes/NotesLayout";
import NotesList from "./pages/Notes/NotesList/NotesList";

const app = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<NotesLayout />}>
            <Route path="/notes" element={<NotesList />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default app;
