import React from "react";
import NavBar from "./components/navbar";
import { Route, Redirect, Routes } from "react-router-dom";
import ProductForm from "./components/forms/productForm";
import ModelForm from "./components/forms/modelForm";
import BrandForm from "./components/forms/brandForm";
import ProductBrandForm from "./components/forms/productBrandForm";
import Login from "./components/forms/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/forms/register";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <ToastContainer />
      <main className="container">
        <Routes>
          <Route path="/product" element={<ProductForm />} />
          <Route path="/brand" element={<BrandForm />} />
          <Route path="/productBrand" element={<ProductBrandForm />} />
          <Route path="/model" element={<ModelForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
