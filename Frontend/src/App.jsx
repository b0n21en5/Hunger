import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./Components/NotFound/NotFound";

const MenuPage = lazy(() => import("./pages/MenuPage/MenuPage"));
const ProductDetails = lazy(() =>
  import("./pages/ProductDetails/ProductDetails")
);
const CollectionDetail = lazy(() =>
  import("./pages/CollectionDetail/CollectionDetail")
);
const Profile = lazy(() => import("./pages/Profile/Profile"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/delivery" element={<MenuPage />} />
        <Route
          path="/delivery/:slug"
          element={<ProductDetails pathname="foods" />}
        />
        <Route path="/restaurants" element={<MenuPage />} />
        <Route path="/restaurants/:slug" element={<ProductDetails />} />
        <Route path="/nightlife" element={<MenuPage />} />
        <Route path="/nightlife/:slug" element={<ProductDetails />} />
        <Route path="/collections/:slug" element={<CollectionDetail />} />
        <Route path="/coll-details/:slug" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
