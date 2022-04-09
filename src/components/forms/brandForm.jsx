import React, { Component } from "react";
import BrandTable from "../tables/brandTable";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import ReactLoading from "react-loading";
import _ from "lodash";
import Form from "./form";
import { toast } from "react-toastify";
import { addBrand, deleteBrand, getBrands } from "../../services/brandService";

class BrandForm extends Form {
  state = {
    sortColumn: { path: "", order: "asc" },
    fields: { brand: "" },
    currentPage: 1,
    pageSize: 7,
    data: [],
    errors: {},
    loading: true,
  };

  async componentDidMount() {
    try {
      const { data } = await getBrands();
      console.log(data);
      this.setState({ data, loading: false });
    } catch (ex) {
      toast(ex.response.data.message);
    }
  }

  doSubmit = async () => {
    const { data, fields } = this.state;
    console.log("a", fields);
    this.setState({ loading: true });
    try {
      const { data: result } = await addBrand({ name: fields.brand });
      const newData = [...data, result];
      this.setState({ data: newData, fields });
    } catch (ex) {
      this.catchExceptionMessage(ex, "brand");
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
      await deleteBrand(id);
    } catch (ex) {
      this.setState({ data: clone });
      this.catchExceptionMessage(ex, "product");
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

  render() {
    const {
      data: allRows,
      pageSize,
      currentPage,
      sortColumn,
      loading,
      fields,
      errors,
    } = this.state;

    const sortedRows = _.orderBy(
      allRows,
      [sortColumn.path],
      [sortColumn.order]
    );
    const rows = paginate(sortedRows, currentPage, pageSize);
    return (
      <form className="container m-2 row " onSubmit={this.handleSubmit}>
        {loading && <ReactLoading className="test" type="spin" color="blue" />}
        <div className="col mt-4">
          <BrandTable
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
          {this.renderInput(
            "brand",
            "",
            "",
            fields.brand,
            this.handleInputChange,
            errors.brand,
            true
          )}
          <p className="mt-2"> </p>
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default BrandForm;
