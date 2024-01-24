import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import { GlobalData } from "./context/globalData";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";

const Layout = () => {
  const { darkMode, setDarkMode } = useContext(GlobalData);

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }
  return (
    <div
      className={`h-full w-full mx-auto py-2 
    ${darkMode ? "dark" : "light"}`}
    >
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}

        <Route path="/shop" element={<Shop />}></Route>

        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="min-h-screen transition-all">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
