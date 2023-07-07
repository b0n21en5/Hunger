import Cards from "../Components/Cards/Cards";
import Collections from "../Components/Collections/Collections";
import Header from "../Components/Header/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <Cards />
        <Collections />
      </div>
    </div>
  );
};

export default Home;
