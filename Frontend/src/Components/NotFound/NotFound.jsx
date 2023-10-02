import { useNavigate } from "react-router";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.cnt}>
      <h1>404 - Not Found</h1>
      <p className={styles.p}>The requested page does not exist.</p>
      <button className={styles.btn} onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default NotFound;
