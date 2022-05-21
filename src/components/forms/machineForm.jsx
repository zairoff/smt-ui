import React from "react";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import ReactLoading from "react-loading";
import _ from "lodash";
import Form from "./form";
import { toast } from "react-toastify";
import {
  addMachine,
  deleteMachine,
  getMachines,
} from "../../services/machineService";
import MachineTable from "../tables/machineTable";

class MachineForm extends Form {
  inputFile = React.createRef();

  state = {
    sortColumn: { path: "", order: "asc" },
    fields: { machine: "" },
    currentPage: 1,
    pageSize: 7,
    data: [],
    errors: {},
    loading: true,
    image: null,
  };

  async componentDidMount() {
    try {
      const { data } = await getMachines();
      this.setState({ data });
    } catch (ex) {
      toast(ex.response.data.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  doSubmit = async () => {
    const { data, fields, image } = this.state;
    if (!image) {
      toast.warning("Please upload image!");
      return;
    }
    this.setState({ loading: true });
    try {
      const formData = new FormData();
      formData.append("name", fields.machine);
      formData.append("file", image);
      const { data: result } = await addMachine(formData);
      const newData = [...data, result];
      this.setState({ data: newData, fields: { machine: "", image: null } });
    } catch (ex) {
      this.catchExceptionMessage(ex, "machine");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = async ({ id }) => {
    const clone = [...this.state.data];
    const { currentPage } = this.state;
    const data = clone.filter((d) => d.id !== id);
    if (this.currentPageCheck(data))
      this.setState({ data, currentPage: currentPage - 1, loading: true });
    else this.setState({ data, loading: true });

    try {
      await deleteMachine(id);
    } catch (ex) {
      this.setState({ data: clone });
      this.catchExceptionMessage(ex, "machine");
    } finally {
      this.setState({ loading: false });
    }
  };

  currentPageCheck(data) {
    const { pageSize } = this.state;

    return data.length % pageSize == 0;
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      //setImage(files[0]);
      this.setState({ image: files[0] });
    }
  };

  handleImageClick = () => {
    this.inputFile.current.click();
  };

  render() {
    const {
      data: allRows,
      pageSize,
      currentPage,
      sortColumn,
      loading,
      fields,
      errors,
      image,
    } = this.state;

    const sortedRows = _.orderBy(
      allRows,
      [sortColumn.path],
      [sortColumn.order]
    );
    const rows = paginate(sortedRows, currentPage, pageSize);
    return (
      <form className="container m-2 row " onSubmit={this.handleSubmit}>
        {loading && (
          <ReactLoading className="loading" type="spin" color="blue" />
        )}
        <div className="col mt-4">
          <MachineTable
            rows={rows}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={allRows.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div className="col m-5">
          <div className="row">
            <div className="col-5 mt-4">
              <input
                style={{ display: "none" }}
                // accept=".zip,.rar"
                ref={this.inputFile}
                onChange={this.handleFileUpload}
                type="file"
              />
              <img
                src={image ? URL.createObjectURL(image) : null}
                style={{ height: "200px", width: "100%", objectFit: "cover" }}
                onClick={this.handleImageClick}
              />
            </div>
            <div className="col">
              {this.renderInput(
                "machine",
                "",
                "",
                fields.machine,
                this.handleInputChange,
                errors.machine,
                true
              )}
              <p className="mt-2"> </p>
              {this.renderButton("Save")}
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default MachineForm;
