import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import "./usermodal.css";

const UserModal = ({ setUserModalVisible }) => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("user-hunger");
    dispatch(login(""));
    setUserModalVisible(false);
  };

  return ReactDOM.createPortal(
    <div
      className="user-modal-overlay"
      onClick={() => setUserModalVisible(false)}
    >
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        <Link className="link" to="/profile">
          Profile
        </Link>
        <Link className="link" onClick={logout}>
          Log out
        </Link>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default React.memo(UserModal);
