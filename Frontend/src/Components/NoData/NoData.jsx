import { Link, useLocation } from "react-router-dom";
import NoResults from "../../assets/no-results.avif";

import "./nodata.css";

const NoData = () => {
  const location = useLocation().pathname.substring(1);

  return (
    <div className="no-data-cnt">
      <div className="no-data-body">
        <div className="">
          <div className="no-data-text-top">Sorry, no results found</div>
          <div className="no-data-text-bottom">
            Try again with fewer filters
          </div>
        </div>
        <img src={NoResults} alt="no-foods-found" height="114" width="125" />
      </div>

      {location !== "delivery" && (
        <Link to="/" className="back-home">
          <button className="btn btn-danger">Back to home</button>
        </Link>
      )}
    </div>
  );
};

export default NoData;
