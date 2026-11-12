import "./Profile.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Falid to fetch profile");
        }

        const data = await response.json();

        setProfile(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (loading) {
    return (
      <div className="profile">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile">
        <p role="alert">{error}</p>
      </div>
    );
  }

  return (
    <section className="profile">
      <div className="profile__header">
        <h1>My Profile</h1>
        <p className="lead">Your account information.</p>
      </div>

      <div className="profile__details">
        <div className="profile__field">
          <span className="profile__label">Name</span>
          <p className="profile__value">{profile.name}</p>
        </div>

        <div className="profile__field">
          <span className="profile__label">Email</span>
          <p className="profile__value">{profile.email}</p>
        </div>

        <div className="profile__field">
          <span className="profile__label">Member Since</span>
          <p className="profile__value">
            {profile.created_at
              ? new Date(profile.created_at).toLocaleDateString("en-IE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not available"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
