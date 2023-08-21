import Layout from "../../Components/Layout/Layout";
import { useAuthContext } from "../../contexts/useAuthContext";

import "./profile.css";

const Profile = () => {
  const { user } = useAuthContext();

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
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
