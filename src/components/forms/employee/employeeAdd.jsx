import React from "react";
import Form from "../form";
import ReactLoading from "react-loading";
import Department from "../../common/department";
import { getDepartmentByHierarchyId } from "../../../services/departmentService";
import { toast } from "react-toastify";

class EmployeeAdd extends Form {
  state = {
    loading: false,
    file: null,
    fields: { name: "", department: "", position: "", address: "", phone: "" },
    errors: {},
    departments: [],
  };

  async componentDidMount() {
    try {
      const { data: departments } = await getDepartmentByHierarchyId("/");
      this.setState({ departments });
    } catch (ex) {
      toast.error(ex.response.data.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  renderImage(img) {
    return (
      <img
        src={img}
        className="rounded"
        style={{ height: "200px", width: "200px", objectFit: "cover" }}
      ></img>
    );
  }

  handleImageSelect = (selected) => {
    const file = URL.createObjectURL(selected.target.files[0]);
    this.setState({ file });
  };

  renderFileUploadInput() {
    return (
      <div
        style={{
          fontFamily: "sans-serif",
          textAlign: "center",
          display: "flex",
        }}
      >
        <label className="custom-file-upload btn btn-secondary">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={this.handleImageSelect}
          />
          upload
        </label>
      </div>
    );
  }

  handleDepartmentSelect = ({ id, departmentId, name }) => {
    let fields = { ...this.state.fields };
    const { departments } = this.state;

    const filter = departmentId.replace(id + "/", "");
    const department = departments.filter((d) => d.departmentId === filter);

    fields.department = department[0].name;
    fields.position = name;
    this.setState({ fields });
  };

  render() {
    const { loading, file, fields, errors, departments } = this.state;
    return (
      <form className="container mt-4 row " onSubmit={this.handleSubmit}>
        {loading && (
          <ReactLoading className="loader" type="spin" color="blue" />
        )}
        <div className="col mt-4">
          {this.renderImage(
            file ? file : require("../../../assets/images/staff.jpg")
          )}
          <p className="mt-2"> </p>
          {this.renderFileUploadInput()}
        </div>
        <div className="col">
          {this.renderInput(
            "name",
            "FullName",
            "",
            fields.name,
            this.handleInputChange,
            errors.name,
            true
          )}
          {this.renderInput(
            "department",
            "Department",
            "",
            fields.department,
            this.handleInputChange,
            errors.department,
            true
          )}
          {this.renderInput(
            "position",
            "Position",
            "",
            fields.position,
            this.handleInputChange,
            errors.position,
            true
          )}
          {this.renderInput(
            "address",
            "Address",
            "",
            fields.address,
            this.handleInputChange,
            errors.address,
            true
          )}
          {this.renderInput(
            "phone",
            "Phone",
            "",
            fields.phone,
            this.handleInputChange,
            errors.phone,
            true
          )}
          <p className="mt-2"> </p>
          {this.renderButton("Save")}
          <p className="mb-2"> </p>
        </div>

        <div className="col m-4">
          <Department
            className="m-2"
            data={departments}
            onClick={this.handleDepartmentSelect}
          />
        </div>
      </form>
    );
  }
}

export default EmployeeAdd;
