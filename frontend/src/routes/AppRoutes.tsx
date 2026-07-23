import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Customers from "../pages/Customers/Customers";
import Products from "../pages/Products/Products";
import Inventory from "../pages/Inventory/Inventory";
import Challans from "../pages/Challans/Challans";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import CustomerDetails from "../pages/Customers/CustomerDetails";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>

          <Route element={<MainLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/customers" element={<Customers />} />

            <Route path="/customers/:id" element={<CustomerDetails />} />

            <Route path="/products" element={<Products />} />

            <Route path="/inventory" element={<Inventory />} />

            <Route path="/challans" element={<Challans />} />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;