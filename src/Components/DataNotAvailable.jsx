import NoResults from "../assets/no-results.avif";

const ouyterContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "30px 300px 50px",
};

const DataNotAvailable = () => {
  return (
    <div style={{ margin: "0 82px" }}>
      <div style={ouyterContainer}>
        <div className="">
          <div style={{ fontSize: "25px", fontWeight: "600" }}>
            Sorry, no results found
          </div>
          <div style={{ opacity: "0.5" }}>Try again with fewer filters</div>
        </div>
        <img src={NoResults} alt="no-foods-found" height="114" width="125" />
      </div>
    </div>
  );
};

export default DataNotAvailable;
