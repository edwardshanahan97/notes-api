import { Route, Routes } from "react-router";
import LandingPage from "./pages/Landing/LandingPage";

const app = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default app;
