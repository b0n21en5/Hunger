import { Navigate } from "react-router";
import Layout from "../../Components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";

import "./profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("user-hunger");
    setUser("");
    Navigate("/");
  };

  return (
    <Layout>
      <div className="profile-main">
        <div className="profile-ovr">
          <img
            width="150"
            height="150"
            src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
            alt="user"
          />
          <div className="profile-user">{user}</div>
          <div className="logout" onClick={logout}>
            Log Out
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
