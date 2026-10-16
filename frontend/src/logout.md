const handleLogout = async () => {
try {
const response = await fetch("http://localhost:3000/api/auth/logout", {
method: "POST",
credentials: "include",
});

      if (!response.ok) {
        console.error("Logout Failed");
        return;
      }
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout request failed:", error);
    }

};

<Button
        text="Logout"
        className="button--primary button--large"
        type="button"
        onClick={handleLogout}
      />
