import React, { Component } from "react";
import { toast } from "react-toastify";
import { paginate } from "../../utils/paginate";
import ReactLoading from "react-loading";
import Form from "./form";
import PcbRepairTable from "../tables/pcbRepairTable";
import _ from "lodash";
import { getReportByBarcode } from "../../services/reportService";
import { getPcbRepairers } from "../../services/pcbRepairerService";
import {
  addPcbRepair,
  deletePcbRepair,
  getPcbRepairsByDate,
} from "../../services/pcbRepairService";

class PcbRepairForm extends Form {
  state = {
    sortColumn: { path: "", order: "asc" },
    fields: { barcode: "", action: "", searchDate: "" },
    model: "",
    line: "",
    defect: "",
    condition: "",
    date: "",
    currentPage: 1,
    pageSize: 7,
    data: [],
    repairers: [],
    errors: {},
    loading: true,
    employeeId: "",
    reportId: "",
    selected: {},
  };

  async componentDidMount() {
    try {
      const { data: repairers } = await getPcbRepairers();
      const date = new Date().toDateString();
      const { data } = await getPcbRepairsByDate(date);
      this.setState({
        repairers,
        data,
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    } finally {
      this.setState({ loading: false });
    }
  }

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

  handleSelectChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "Repairer":
        this.setState({ employeeId: value });
        break;
      case "Status":
        this.setState({ condition: value });
        break;
      default:
        break;
    }
  };

  handleSave = async () => {
    const { employeeId, reportId, fields, condition } = this.state;
    try {
      const { data: repair } = await addPcbRepair({
        reportId,
        condition,
        action: fields.action,
        employeeId,
      });

      this.setState({
        data: [...this.state.data, repair],
        fields: { barcode: "", action: "" },
        model: "",
        line: "",
        defect: "",
        condition: "",
        date: "",
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = async ({ id }) => {
    const clone = [...this.state.data];
    const filtered = clone.filter((r) => r.id != id);
    this.setState({ data: filtered, loading: true });
    try {
      await deletePcbRepair(id);
    } catch (ex) {
      toast.error(ex.response.data.message);
      this.state({ data: clone });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleInputKeyPress = async (e) => {
    if (e.key === "Enter") {
      this.setState({
        loading: true,
        fields: { barcode: "", action: "" },
        model: "",
        line: "",
        defect: "",
        date: "",
      });
      try {
        const { data: report } = await getReportByBarcode(e.target.value);
        if (Object.keys(report).length > 0) {
          this.setState({
            fields: {
              barcode: report.barcode,
              action: "",
            },
            reportId: report.id,
            model: report.model.name,
            defect: report.defect.name,
            line: report.line.name,
            date: report.date,
          });
        }
      } catch (ex) {
        toast.error(ex.response.data.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  handleSearch = async () => {
    try {
      const { data } = await getPcbRepairsByDate(this.state.fields.searchDate);
      this.setState({ data });
    } catch (ex) {
      toast.error(ex.response.data.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      fields,
      model,
      defect,
      line,
      date,
      data,
      sortColumn,
      errors,
      loading,
      pageSize,
      currentPage,
      repairers,
    } = this.state;

    const sortedRows = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    const rows = paginate(sortedRows, currentPage, pageSize);

    return (
      <div className="container mt-2 row">
        {loading && (
          <ReactLoading className="loading" type="spin" color="blue" />
        )}
        <div className="col m-2">
          <div className="row mt-2 mb-2">
            <div className="col">
              {this.renderInput(
                "searchDate",
                "Date",
                "",
                fields.searchDate,
                this.handleInputChange,
                errors.searchDate,
                false,
                "date"
              )}
            </div>
            <div className="col-4 mt-4">
              {this.renderButton("SEARCH", "button", this.handleSearch)}
            </div>
          </div>

          {rows.length > 0 && (
            <PcbRepairTable
              rows={rows}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
            />
          )}
        </div>
        <div className="col-4 m-2">
          {this.renderInput(
            "barcode",
            "Barcode",
            "",
            fields.barcode,
            this.handleInputChange,
            errors.barcode,
            true,
            "text",
            undefined,
            false,
            this.handleInputKeyPress
          )}
          {this.renderInput(
            "model",
            "Model",
            "",
            model,
            this.handleInputChange,
            errors.model,
            true
          )}
          {this.renderInput(
            "line",
            "Line",
            "",
            line,
            this.handleInputChange,
            errors.line,
            true
          )}
          {this.renderInput(
            "defect",
            "Defect",
            "",
            defect,
            this.handleInputChange,
            errors.defect,
            true
          )}
          {this.renderInput(
            "date",
            "Created date",
            "",
            date,
            this.handleInputChange,
            errors.date,
            true
          )}
          {this.renderSelect(
            "Repairer",
            repairers,
            errors.repairers,
            this.handleSelectChange,
            "employee.id",
            "employee.fullName"
          )}
          {this.renderTextArea(
            "action",
            "Action",
            fields.action,
            this.handleInputChange
          )}
          {this.renderSelect(
            "Status",
            [
              { id: 1, name: "Worked" },
              { id: 2, name: "Not Worked" },
            ],
            errors.repairers,
            this.handleSelectChange
          )}
          <p className="mt-2"> </p>
          {this.renderButton("Save", "button", this.handleSave)}
        </div>
      </div>
    );
  }
}

export default PcbRepairForm;
