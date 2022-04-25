import React from "react";
import Form from "./form";
import ReactLoading from "react-loading";
import Department from "../common/department";
import { toast } from "react-toastify";
import {
  addDepartment,
  deleteDepartment,
  getDepartmentByHierarchyId,
  getDepartments,
} from "../../services/departmentService";

class DepartmentForm extends Form {
  state = {
    data: [],
    fields: { department: "" },
    errors: {},
    loading: true,
    selected: { id: 0, hierarchyid: "", name: "" },
  };

  async componentDidMount() {
    try {
      const { data } = await getDepartmentByHierarchyId("/", 0);
      this.setState({ data, loading: false });
    } catch (ex) {
      toast.error(ex.response.data.message);
      this.setState({ loading: false });
    }
  }

  doSubmit = async () => {
    const { fields, selected } = this.state;
    this.setState({ loading: true });
    try {
      await addDepartment({
        departmentId: selected.hierarchyid,
        name: fields.department,
      });
      const { data } = await getDepartmentByHierarchyId("/", 0);
      this.setState({ data, fields, loading: false });
    } catch (ex) {
      this.setState({ loading: false });
      this.catchExceptionMessage(ex, "department");
    }
  };

  handleDelete = async () => {
    this.setState({ loading: true });
    try {
      await deleteDepartment(this.state.selected.id);
      const { data } = await getDepartmentByHierarchyId("/", 0);
      this.setState({ data, loading: false });
    } catch (ex) {
      this.setState({ loading: false });
      this.catchExceptionMessage(ex, "department");
    }
  };

  onClicked = (selected) => {
    console.log("selected:", selected);
    this.setState({ selected });
  };

  render() {
    const { fields, data, errors, loading } = this.state;
    return (
      <form className="container m-2 row" onSubmit={this.handleSubmit}>
        {loading && <ReactLoading className="test" type="spin" color="blue" />}
        <div className="col mt-4">
          <Department data={data} onClick={this.onClicked} />
        </div>
        <div className="col m-2">
          {this.renderInput(
            "department",
            "",
            "",
            fields.department,
            this.handleInputChange,
            errors.department,
            true
          )}
          <p className="mt-2"> </p>
          {this.renderButton("Save", "submit")}
          <p className="mt-2"> </p>
          {this.renderButton(
            "Delete",
            "button",
            this.handleDelete,
            "btn btn-danger btn-block btn-lg w-100"
          )}
        </div>
      </form>
    );
  }
}

export default DepartmentForm;
