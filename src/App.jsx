import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Delivery from "./pages/Delivery";
import Resturants from "./pages/Resturants";
import Nightlife from "./pages/Nightlife";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { foods } from "./../data/food";
import { resturants } from "../data/resturants";
import { clubs } from "../data/clubs";
import CollectionDetail from "./pages/CollectionDetail/CollectionDetail";
import { uniqueDining } from "../data/collections";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-food-online" element={<Delivery />} />
        <Route path="/order/:slug" element={<ProductDetails foods={foods} />} />
        <Route path="/resturants" element={<Resturants />} />
        <Route
          path="/resturants/:slug"
          element={<ProductDetails foods={resturants} />}
        />
        <Route path="/nightlife" element={<Nightlife />} />
        <Route
          path="/nightlife/:slug"
          element={<ProductDetails foods={clubs} />}
        />
        <Route path="/collections/:slug" element={<CollectionDetail />} />
        <Route
          path="/coll-details/:slug"
          element={<ProductDetails foods={uniqueDining} />}
        />
      </Routes>
    </>
  );
}

export default App;
