import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useAuthContext } from "../../contexts/useAuthContext";
import axios from "axios";
import toast from "react-hot-toast";

import "./auth.css";

const Login = ({ setForPassVis, setIsLoginVisible, setIsSignupVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuthContext();

  // Login
  const handleLoginPost = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password,
      });
      if (data.username) setUser(data.username);
      toast.success(`${data.username} logged in`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.wrong) {
        toast.error(error.response.data.wrong);
      } else {
        console.error("An error occurred:", error.message);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleLoginBtnClick = () => {
    setIsLoginVisible(false);
    if (username && password) {
      handleLoginPost();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="auth-modal-overlay"
      onClick={() => setIsLoginVisible(false)}
    >
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-top">
          <div className="auth-title">Login</div>
          <FontAwesomeIcon
            icon={faXmark}
            style={{ cursor: "pointer" }}
            onClick={() => setIsLoginVisible(false)}
          />
        </div>
        <form className="auth-middle" onSubmit={handleLoginBtnClick}>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-btn">
            Log In
          </button>
        </form>
        <div className="auth-bottom">
          <div>New to Hunger?</div>
          <div
            onClick={() => {
              setIsLoginVisible(false);
              setIsSignupVisible(true);
            }}
            style={{ color: "red", cursor: "pointer" }}
          >
            Create account
          </div>
        </div>
        <div className="auth-bottom">
          <div>Forgot Password ?</div>
          <div
            onClick={() => {
              setIsLoginVisible(false);
              setForPassVis(true);
            }}
            style={{ color: "red", cursor: "pointer" }}
          >
            Reset Password
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default React.memo(Login);
