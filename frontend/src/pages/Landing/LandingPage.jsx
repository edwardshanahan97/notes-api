import LandingFeatures from "./LandingFeatures/LandingFeatures";
import LandingHero from "./LandingHero/LandingHero";
import LandingNavbar from "./LandingNavbar/LandingNavbar";

const LandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
    </>
  );
};

export default LandingPage;
