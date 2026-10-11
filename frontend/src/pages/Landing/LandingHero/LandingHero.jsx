import "./LandingHero.css";
import Container from "../../../components/Container/Container";
import Button from "../../../components/Button/Button";
import { MoveRight } from "lucide-react";

const LandingHero = () => {
  return (
    <div className="landing-hero">
      <Container>
        <h1>
          Write. Organise. <span>Remember.</span>
        </h1>

        <p className="lead">
          A simple Markdown notes app for keeping everything in one place.
        </p>

        <Button
          className="button--primary"
          text={
            <>
              Start Writing <MoveRight size={18} strokeWidth={1.5} />
            </>
          }
          link="/register"
        />
      </Container>
    </div>
  );
};

export default LandingHero;
