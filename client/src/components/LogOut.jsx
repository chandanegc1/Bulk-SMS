import React from "react";
import axios from "axios";

const LogOut = () => {
  const handleLogout = async () => {
    try {
      const response = await axios("/api/v1/auth/logout");
      if (response.status === 200) {
        localStorage.clear("credential");
        alert("Logged out successfully!");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div>
      <button
        className="btn btn-block form-btn"
        style={{ margin: "10px", width: "200px" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogOut;
