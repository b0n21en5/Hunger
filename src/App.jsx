import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Delivery from "./pages/Delivery";
import Resturants from "./pages/Resturants";
import Nightlife from "./pages/Nightlife";
import FoodDetails from "./pages/FoodDetails/FoodDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-food-online" element={<Delivery />} />
        <Route path="/order/:slug" element={<FoodDetails />} />
        <Route path="/resturants" element={<Resturants />} />
        <Route path="/nightlife" element={<Nightlife />} />
      </Routes>
    </>
  );
}

export default App;
