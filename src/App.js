import React, { Component } from "react";
import NavBar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import ProductForm from "./components/forms/productForm";
import ModelForm from "./components/forms/modelForm";
import BrandForm from "./components/forms/brandForm";
import ProductBrandForm from "./components/forms/productBrandForm";
import Login from "./components/forms/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/forms/register";
import { render } from "@testing-library/react";
import jwtDecode from "jwt-decode";
import DefectForm from "./components/forms/defectForm";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Routes>
            <Route path="/product" element={<ProductForm />} />
            <Route path="/brand" element={<BrandForm />} />
            <Route path="/productBrand" element={<ProductBrandForm />} />
            <Route path="/model" element={<ModelForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/defect" element={<DefectForm />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
