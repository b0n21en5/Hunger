import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Delivery = lazy(() => import("./pages/Delivery"));
const Resturants = lazy(() => import("./pages/Resturants"));
const Nightlife = lazy(() => import("./pages/Nightlife"));
const ProductDetails = lazy(() =>
  import("./pages/ProductDetails/ProductDetails")
);
const CollectionDetail = lazy(() =>
  import("./pages/CollectionDetail/CollectionDetail")
);
import { foods } from "./../data/food";
import { resturants } from "../data/resturants";
import { clubs } from "../data/clubs";
import { uniqueDining } from "../data/collections";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default App;
