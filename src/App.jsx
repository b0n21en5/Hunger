import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Delivery from "./pages/Delivery";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-food-online" element={<Delivery />} />
      </Routes>
    </>
  );
}

export default App;
