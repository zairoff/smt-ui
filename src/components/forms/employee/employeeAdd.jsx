import React from "react";
import Form from "../form";
import ReactLoading from "react-loading";
import Department from "../../common/department";
import { getDepartmentByHierarchyId } from "../../../services/departmentService";
import { toast } from "react-toastify";
import { addEmployee } from "../../../services/employeeService";

class EmployeeAdd extends Form {
  state = {
    loading: false,
    photo: null,
    image: null,
    fields: {
      name: "",
      passport: "",
      department: "",
      position: "",
      birthday: "",
      address: "",
      phone: "",
      details: "",
    },
    departmentId: "",
    errors: {},
    departments: [],
  };

  async componentDidMount() {
    try {
      const { data: departments } = await getDepartmentByHierarchyId("/");
      const image = require("../../../assets/images/staff.jpg");
      this.setState({ departments, image });
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
    this.setState({
      photo: URL.createObjectURL(selected.target.files[0]),
      image: selected.target.files[0],
    });
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
        <label className="custom-image-upload btn btn-secondary">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={this.handleImageSelect}
          />
          Browse
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
    this.setState({ fields, departmentId: id });
  };

  doSubmit = async () => {
    const { image, departmentId, fields } = this.state;
    const {
      name,
      birthday,
      phone,
      address,
      details,
      department,
      position,
      passport,
    } = fields;

    const formData = new FormData();
    formData.append("Position", position);
    formData.append("DepartmentName", department);
    formData.append("Passport", passport);
    formData.append("DepartmentId", departmentId);
    formData.append("FullName", name);
    formData.append("Birthday", birthday);
    formData.append("Phone", phone);
    formData.append("Address", address);
    formData.append("Details", details);
    formData.append("File", image);

    this.setState({ loading: true });

    try {
      const { data: result } = await addEmployee(formData);
      toast.info("Success!");
    } catch (ex) {
      toast.error(ex.response.data.message);
    } finally {
      this.setState({
        loading: false,
        fields: {
          name: "",
          birthday: "",
          phone: "",
          address: "",
          details: "",
          department: "",
          position: "",
          passport: "",
          photo: null,
        },
      });
    }
  };

  render() {
    const { loading, photo, fields, errors, departments } = this.state;
    return (
      <form
        className="container mt-4 row "
        encType="multipart/form-data"
        onSubmit={this.handleSubmit}
      >
        {loading && (
          <ReactLoading className="loading" type="spin" color="blue" />
        )}
        <div className="col mt-4">
          {this.renderImage(
            photo ? photo : require("../../../assets/images/staff.jpg")
          )}
          <p className="mt-2"> </p>
          {this.renderFileUploadInput()}
        </div>
        <div className="col">
          {this.renderInput(
            "name",
            "Full Name",
            "",
            fields.name,
            this.handleInputChange,
            errors.name,
            true
          )}
          {this.renderInput(
            "passport",
            "Passport",
            "",
            fields.passport,
            this.handleInputChange,
            errors.passport,
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
            "birthday",
            "Birthday",
            "",
            fields.birthday,
            this.handleInputChange,
            errors.birthday,
            true,
            "date"
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
          {this.renderTextArea(
            "details",
            "Additional info",
            fields.details,
            this.handleInputChange
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
