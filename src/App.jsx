import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { FilterContextProvider } from "./contexts/useFilterContext";

const Home = lazy(() => import("./pages/Home/Home"));
const Delivery = lazy(() => import("./pages/Delivery"));
const Resturants = lazy(() => import("./pages/Resturants"));
const Nightlife = lazy(() => import("./pages/Nightlife"));
const ProductDetails = lazy(() =>
  import("./pages/ProductDetails/ProductDetails")
);
const CollectionDetail = lazy(() =>
  import("./pages/CollectionDetail/CollectionDetail")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FilterContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Delivery />} />
          <Route path="/order/:slug" element={<ProductDetails />} />
          <Route path="/resturants" element={<Resturants />} />
          <Route path="/resturants/:slug" element={<ProductDetails />} />
          <Route path="/nightlife" element={<Nightlife />} />
          <Route path="/nightlife/:slug" element={<ProductDetails />} />
          <Route path="/collections/:slug" element={<CollectionDetail />} />
          <Route
            path="/coll-details/:slug"
            element={<ProductDetails pathname="resturants" />}
          />
        </Routes>
      </FilterContextProvider>
    </Suspense>
  );
}

export default App;
