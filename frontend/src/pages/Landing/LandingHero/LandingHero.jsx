import "./LandingHero.css";
import Button from "../../../components/Button/Button";
import { MoveRight } from "lucide-react";
import HeroImg from "../../../assets/images/temp-landing-img.png";

const LandingHero = () => {
  return (
    <div className="landing-hero">
      <div className="landing-hero__text">
        <h1>
          Write. Organise. <span>Remember.</span>
        </h1>

        <p className="lead">
          A simple Markdown notes app for keeping everything in one place.
        </p>

        <Button
          className="button--primary button--large"
          text={
            <>
              Start Writing <MoveRight />
            </>
          }
          link="/register"
        />
      </div>

      <img src={HeroImg} alt="Notes app" />
    </div>
  );
};

export default LandingHero;
