import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { FilterContextProvider } from "./contexts/useFilterContext";
import { AuthContextProvider } from "./contexts/useAuthContext";
import Home from "./pages/Home/Home";

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
      <FilterContextProvider>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/delivery" element={<MenuPage />} />
            <Route path="/delivery/:slug" element={<ProductDetails />} />
            <Route path="/restaurants" element={<MenuPage />} />
            <Route
              path="/restaurants/:slug"
              element={<ProductDetails pathname="restaurants" />}
            />
            <Route path="/nightlife" element={<MenuPage />} />
            <Route
              path="/nightlife/:slug"
              element={<ProductDetails pathname="restaurants" />}
            />
            <Route path="/collections/:slug" element={<CollectionDetail />} />
            <Route
              path="/coll-details/:slug"
              element={<ProductDetails pathname="restaurants" />}
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AuthContextProvider>
      </FilterContextProvider>
    </Suspense>
  );
}

export default App;
