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
import jwtDecode from "jwt-decode";
import DefectForm from "./components/forms/defectForm";
import LineForm from "./components/forms/lineForm";
import LineDefectForm from "./components/forms/lineDefectForm";
import DepartmentForm from "./components/forms/departmentForm";
import EmployeeDashboard from "./components/forms/employee/employeeDashboard";
import EmployeeAdd from "./components/forms/employee/employeeAdd";
import Report from "./components/reports/report";
import EmployeeEdit from "./components/forms/employee/employeeEdit";
import MachineForm from "./components/forms/machineForm";
import MachineRepairForm from "./components/forms/machineRepairForm";
import PcbRepairerForm from "./components/forms/pcbRepairerForm";
import PcbRepairForm from "./components/forms/pcbRepairForm";
import MachineRepairerForm from "./components/forms/machineRepairerForm";
import Card from "./components/common/card";
import MachineDashborad from "./components/machineDashboard";
import MachineHistory from "./components/machineHistory";
import PcbReport from "./components/reports/pcbReport";
import PcbCard from "./components/reports/pcbCard";
import StaticsForm from "./components/statics/staticsForm";

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
        <main className="container ">
          <Routes>
            <Route path="/product" element={<ProductForm />} />
            <Route path="/brand" element={<BrandForm />} />
            <Route path="/productBrand" element={<ProductBrandForm />} />
            <Route path="/model" element={<ModelForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/defect" element={<DefectForm />} />
            <Route path="/line" element={<LineForm />} />
            <Route path="/lineDefect" element={<LineDefectForm />} />
            <Route path="/department" element={<DepartmentForm />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee-add" element={<EmployeeAdd />} />
            <Route path="/report" element={<Report />} />
            <Route path="/employee-edit/:empId" element={<EmployeeEdit />} />
            <Route path="/pcb-repairer" element={<PcbRepairerForm />} />
            <Route path="/pcb-repair" element={<PcbRepairForm />} />
            <Route path="/machine" element={<MachineForm />} />
            <Route path="/machine-repair" element={<MachineRepairForm />} />
            <Route path="/machine-repairer" element={<MachineRepairerForm />} />
            <Route path="/machine-dashboard" element={<MachineDashborad />} />
            <Route path="/pcb-report" element={<PcbReport />} />
            <Route path="/statics" element={<StaticsForm />} />
            <Route
              path="/machine-history/:machineId"
              element={<MachineHistory />}
            />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
