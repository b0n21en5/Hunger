import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useAuthContext } from "../../contexts/useAuthContext";
import axios from "axios";

import "./auth.css";

const Login = ({ setForPassVis, setIsLoginVisible, setIsSignupVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuthContext();

  // Login
  const handleLoginPost = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        { username, password }
      );
      setUser(data.username);
      alert("user logged in");
      console.log(data);
    } catch (error) {
      console.log(error);
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
        <div className="auth-middle">
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-btn" onClick={handleLoginBtnClick}>
            Log In
          </div>
        </div>
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
