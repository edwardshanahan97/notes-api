import { Route, Routes } from "react-router";
import LandingPage from "./pages/Landing/LandingPage";
import AuthLayout from "./pages/Auth/AuthLayout";
import LoginPage from "./pages/Auth/Login/LoginPage";
import Register from "./pages/Auth/Register/RegisterPage";
import Notes from "./pages/Notes/Notes";

const app = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
};

export default app;
