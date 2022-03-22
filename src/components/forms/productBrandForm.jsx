import _ from "lodash";
import React from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import ProductBrandTable from "../tables/productBrandTable";
import Form from "./form";

class ProductBrandForm extends Form {
  state = {
    currentPage: 1,
    sortColumn: { path: "", order: "asc" },
    pageSize: 4,
    products: [
      { id: 1, product: "TV" },
      { id: 2, product: "Air" },
    ],
    brands: [
      { id: 1, brand: "Artel" },
      { id: 2, brand: "TCL" },
    ],
    rows: [
      {
        id: 1,
        product: "TV",
        brand: "Artel",
      },
      {
        id: 2,
        product: "TV",
        brand: "TCL",
      },
      {
        id: 3,
        product: "TV",
        brand: "Cultraview",
      },
      {
        id: 4,
        product: "Air",
        brand: "Samsung",
      },
      {
        id: 5,
        product: "Washing",
        brand: "WirePool",
      },
    ],
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (item) => {
    console.log("handleDelete:", item);
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      rows: allData,
      pageSize,
      currentPage,
      sortColumn,
      products,
      brands,
    } = this.state;

    const itemsCount = allData.length;
    const sortedData = _.orderBy(
      allData,
      [sortColumn.path],
      [sortColumn.order]
    );

    const data = paginate(sortedData, currentPage, pageSize);

    return (
      <form className="container m-2 row">
        <div className="col mt-4">
          <ProductBrandTable
            rows={data}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div className="col m-5">
          {this.renderSelect("Product", products)}
          <p className="mt-2"> </p>
          {this.renderSelect("Brand", brands)}
          <p className="mt-2"> </p>
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default ProductBrandForm;
