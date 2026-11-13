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
  } catch (error) {
    console.error("Logout request failed:", error);
  }
};

export default handleLogout;
