import ReactDOM from "react-dom";
import { useAuthContext } from "../../contexts/useAuthContext";
import { Link } from "react-router-dom";

import "./usermodal.css";
import React from "react";

const UserModal = ({ setUserModalVisible }) => {
  const { setUser } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user-hunger");
    setUser("");
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
