import React from "react";
import NavBar from "./components/navbar";
import { Route, Redirect, Routes } from "react-router-dom";
import ProductForm from "./components/forms/productForm";
import Model from "./components/forms/model";
import BrandForm from "./components/forms/brandForm";
import ProductBrandForm from "./components/forms/productBrandForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/product" element={<ProductForm />} />
          <Route path="/brand" element={<BrandForm />} />
          <Route path="/productBrand" element={<ProductBrandForm />} />
          <Route path="/model" element={<Model />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
