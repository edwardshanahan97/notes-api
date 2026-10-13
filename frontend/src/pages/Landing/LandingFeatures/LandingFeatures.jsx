import "./LandingFeatures.css";

import { Search, SquareText, Tags } from "lucide-react";

const LandingFeatures = () => {
  return (
    <div className="landing-features">
      <div className="landing-features__group">
        <div className="landing-features__icon">
          <SquareText color="var(--color-primary)" />
        </div>

        <div className="landing-features__text">
          <h2>Markdown</h2>

          <p>Write notes using simple Markdown syntax.</p>
        </div>
      </div>

      <div className="landing-features__group">
        <div className="landing-features__icon">
          <Tags color="var(--color-primary)" />
        </div>

        <div className="landing-features__text">
          <h2>Tags</h2>

          <p>Organize your notes with tags.</p>
        </div>
      </div>

      <div className="landing-features__group">
        <div className="landing-features__icon">
          <Search color="var(--color-primary)" />
        </div>

        <div className="landing-features__text">
          <h2>Search</h2>

          <p>Find your notes quickly.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingFeatures;
