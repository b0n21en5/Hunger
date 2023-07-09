import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Delivery from "./pages/Delivery";
import Resturants from "./pages/Resturants";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-food-online" element={<Delivery />} />
        <Route path="/resturants" element={<Resturants />} />
      </Routes>
    </>
  );
}

export default App;
