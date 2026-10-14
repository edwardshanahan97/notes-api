import Container from "../../components/Container/Container";
import LandingFeatures from "./LandingFeatures/LandingFeatures";
import LandingHero from "./LandingHero/LandingHero";
import LandingNavbar from "./LandingNavbar/LandingNavbar";
import Circles from "../../components/Circles/Circles";

const LandingPage = () => {
  return (
    <Container>
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <Circles />
    </Container>
  );
};

export default LandingPage;
