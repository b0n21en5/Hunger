import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import "./auth.css";

const Reset = ({ setForPassVis, setIsLoginVisible }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Login
  const handleResetPassword = async () => {
    try {
      const { data } = await axios.put("/api/auth/reset-password", {
        email,
        newPassword,
      });
      setForPassVis(false);
      setIsLoginVisible(true);
      toast.success(data.message);
    } catch (error) {
      toast.error("Error in Password Reset!");
    }
  };

  const handleFormSubmit = () => {
    setIsLoginVisible(false);
    if (email && newPassword) {
      handleResetPassword();
    }
  };

  return ReactDOM.createPortal(
    <div className="auth-modal-overlay" onClick={() => setForPassVis(false)}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-top">
          <div className="auth-title">Reset Password</div>
          <FontAwesomeIcon
            icon={faXmark}
            style={{ cursor: "pointer" }}
            onClick={() => setForPassVis(false)}
          />
        </div>
        <form className="auth-middle" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Confirm New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn" style={{ padding: "5px" }}>
            Reset
          </button>
        </form>
        <div className="auth-bottom">
          <div>Have an account ?</div>
          <div
            onClick={() => {
              setIsLoginVisible(true);
              setForPassVis(false);
            }}
            style={{ color: "red", cursor: "pointer" }}
          >
            Login
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default React.memo(Reset);
