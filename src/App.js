import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Views/Login/Login";
import HomePage from "./Views/HomePage/HomePage";
import CartPage from "./Views/Cart/CartPage";
import AddProductPage from "./Views/AddProduct/AddProductPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const protect = localStorage.getItem("token");
    if (!protect) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/homepage" element={<HomePage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/addproduct" element={<AddProductPage />}></Route>
    </Routes>
  );
}

export default App;
