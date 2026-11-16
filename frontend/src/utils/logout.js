const handleLogout = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
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
