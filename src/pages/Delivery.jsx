import Brands from "../Components/Brands/Brands";
import FoodList from "../Components/FoodCard/FoodList";
import Inspiration from "../Components/Inspiration/Inspiration";
import Layout from "../Components/Layout/Layout";

const Delivery = () => {
  return (
    <Layout>
      <Inspiration />
      <Brands />
      <FoodList />
    </Layout>
  );
};

export default Delivery;
