import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

import "./auth.css";
import axios from "axios";

const SignUp = ({ setIsLoginVisible, setIsSignupVisible }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  Post Register request
  const handleRegisterPost = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register-user",
        { username, email, password }
      );
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignupBtnClick = () => {
    setIsSignupVisible(false);
    if (username && email && password) {
      handleRegisterPost();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="auth-modal-overlay"
      onClick={() => setIsSignupVisible(false)}
    >
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-top">
          <div className="auth-title">Sign up</div>
          <FontAwesomeIcon
            icon={faXmark}
            style={{ cursor: "pointer" }}
            onClick={() => setIsSignupVisible(false)}
          />
        </div>
        <div className="auth-middle">
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-btn" onClick={handleSignupBtnClick}>
            Sign Up
          </div>
        </div>
        <div className="auth-bottom">
          <div>Already have an account?</div>
          <div
            onClick={() => {
              setIsSignupVisible(false);
              setIsLoginVisible(true);
            }}
            style={{ color: "red", cursor: "pointer" }}
          >
            Log in
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default React.memo(SignUp);
