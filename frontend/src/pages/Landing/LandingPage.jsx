import Container from "../../components/Container/Container";
import LandingFeatures from "./LandingFeatures/LandingFeatures";
import LandingHero from "./LandingHero/LandingHero";
import LandingNavbar from "./LandingNavbar/LandingNavbar";

const LandingPage = () => {
  return (
    <Container>
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
    </Container>
  );
};

export default LandingPage;
