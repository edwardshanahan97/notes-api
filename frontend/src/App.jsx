import { Route, Routes } from "react-router";
import LandingPage from "./pages/Landing/LandingPage";

const app = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default app;
