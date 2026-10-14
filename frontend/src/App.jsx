import { Route, Routes } from "react-router";
import LandingPage from "./pages/Landing/LandingPage";
import AuthLayout from "./pages/Auth/AuthLayout";
import LoginPage from "./pages/Auth/Login/LoginPage";
import Register from "./pages/Auth/Register/RegisterPage";

const app = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default app;
