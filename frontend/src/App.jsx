import { Route, Routes } from "react-router";
import LandingPage from "./pages/Landing/LandingPage";
import AuthLayout from "./pages/Auth/AuthLayout";
import LoginPage from "./pages/Auth/Login/LoginPage";
import Register from "./pages/Auth/Register/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotesLayout from "./pages/Notes/NotesLayout";
import NotesWorkspace from "./pages/Notes/NotesWorkspace/NotesWorkspace";

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
            <Route path="/notes" element={<NotesWorkspace />} />
            <Route path="/notes/:id" element={<NotesWorkspace />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default app;
