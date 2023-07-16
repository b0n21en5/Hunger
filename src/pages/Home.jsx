import Cards from "../Components/Cards/Cards";
import Collections from "../Components/Collections/Collections";
import banner from "../assets/banner.avif";

const Home = () => {
  return (
    <div>
      <div className="mb-4 position-relative">
        <img
          height="380px"
          width="100%"
          src={banner}
          alt="banner"
          style={{ objectFit: "cover", border: "none" }}
        />
      </div>
      <div className="main-cnt">
        <Cards />
        <Collections />
      </div>
    </div>
  );
};

export default Home;
