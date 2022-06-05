import React from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import { getBrands } from "../../services/brandService";
import { getLineDefectByLineId } from "../../services/lineDefectService";
import { getLines } from "../../services/lineService";
import {
  getModelByProductBrandId,
  getModels,
} from "../../services/modelService";
import { getProductBrandByProductId } from "../../services/productBrandService";
import { getProducts } from "../../services/productService";
import { getReports, getReportsBy } from "../../services/reportService";
import {
  getByBrand,
  getByLine,
  getByModel,
  getByProduct,
} from "../../services/staticsService";
import Form from "../forms/form";
import StaticsGroupedTable from "../tables/staticsGroupedTable";
import StaticsTable from "../tables/staticsTable";

class StaticsForm extends Form {
  state = {
    products: [],
    productBrands: [],
    brands: [],
    models: [],
    lines: [],
    reports: [],
    dateFrom: "",
    dateTo: "",
    errors: {},
    loading: true,
    filters: [
      { id: 1, name: "All" },
      { id: 2, name: "Product" },
      { id: 3, name: "Brand" },
      { id: 4, name: "Model" },
      { id: 5, name: "Line" },
    ],
    sort: false,
    sortColumn: { path: "", order: "asc" },
    selectedProduct: "",
    selectedBrand: "",
    selectedModel: "",
    selectedLine: "",
    fields: { from: "", to: "" },
    isFiltered: false,
  };

  async componentDidMount() {
    try {
      const { data } = await getProducts();
      const products = [{ id: -1, name: "All" }, ...data];

      this.setState({
        products,
        loading: false,
      });
    } catch (ex) {
      this.setState({ loading: false });
      toast.error(ex.message);
    }
  }

  handleSelectChange = async ({ target }) => {
    const { name, value: id } = target;

    this.setState({ loading: true });
    try {
      switch (name) {
        case "Product":
          {
            if (id === "-1") {
              const { data } = await getBrands();
              const brands = [{ id: -1, name: "All" }, ...data];
              this.setState({
                brands,
                selectedProduct: id,
                reports: [],
                loading: false,
              });
            } else {
              const { data: productBrands } = await getProductBrandByProductId(
                id
              );
              const data = productBrands.map((p) => p.brand);
              const brands = [{ id: -1, name: "All" }, ...data];

              this.setState({
                brands,
                reports: [],
                productBrands,
                selectedProduct: id,
                loading: false,
              });
            }
          }
          break;
        case "Brand":
          {
            if (id === "-1") {
              const { data } = await getModels();
              const models = [{ id: -1, name: "All" }, ...data];
              this.setState({
                selectedBrand: id,
                models,
                loading: false,
                reports: [],
              });
            } else {
              const { productBrands, selectedProduct } = this.state;
              const productBrand = productBrands.filter(
                (pb) => pb.product.id == selectedProduct && pb.brand.id == id
              );

              const prodcutBrandId =
                productBrand.length > 0 ? productBrand[0].id : 0;
              const { data } = await getModelByProductBrandId(prodcutBrandId);

              const models = [{ id: -1, name: "All" }, ...data];
              this.setState({
                selectedBrand: id,
                models,
                loading: false,
                reports: [],
              });
            }
          }
          break;
        case "Model":
          const { data } = await getLines();

          const lines = [{ id: -1, name: "All" }, ...data];

          this.setState({
            selectedModel: id,
            lines,
            reports: [],
            loading: false,
          });
          break;
        case "Line":
          {
            this.setState({
              selectedLine: id,
              reports: [],
              loading: false,
            });
          }
          break;
      }
    } catch (ex) {
      toast.error(ex.message);
      this.setState({ loading: false });
    }
  };

  handleFilterChange = async ({ target }) => {
    const { value: id } = target;
    const { from, to } = this.state.fields;

    if (!from || !to) return;

    this.setState({ loading: true });

    try {
      switch (id) {
        case "2": {
          const { data: reports } = await getByProduct(from, to);
          this.setState({ reports, loading: false, isFiltered: true });
          break;
        }

        case "3": {
          const { data: reports } = await getByBrand(from, to);
          this.setState({ reports, loading: false, isFiltered: true });
          break;
        }

        case "4": {
          const { data: reports } = await getByModel(from, to);
          console.log("eee", reports);
          this.setState({ reports, loading: false, isFiltered: true });
          break;
        }

        case "5": {
          const { data: reports } = await getByLine(from, to);
          this.setState({ reports, loading: false, isFiltered: true });
          break;
        }
      }
    } catch (ex) {
      toast.error(ex.message);
      this.setState({ loading: false });
    }
  };

  doSubmit = async () => {
    const {
      selectedProduct,
      selectedBrand,
      selectedModel,
      selectedLine,
      fields,
    } = this.state;

    this.setState({ loading: true });
    try {
      const { data: reports } = await getReportsBy(
        selectedProduct,
        selectedBrand,
        selectedModel,
        selectedLine,
        fields.from,
        fields.to
      );
      console.log("rep", reports);
      this.setState({ reports, isFiltered: false });
    } catch (ex) {
      toast.error(ex.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      products,
      brands,
      models,
      lines,
      reports,
      filters,
      sortColumn,
      fields,
      isFiltered,
    } = this.state;

    const excel = isFiltered
      ? reports
      : reports.map((d) => ({
          barcode: d.barcode,
          product: d.model.productBrand.product.name,
          brand: d.model.productBrand.brand.name,
          model: d.model.name,
          line: d.line.name,
          defect: d.defect.name,
          date: d.date,
        }));
    return (
      <>
        <form className="border p-4 mt-2 mb-4" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              {this.renderSelect(
                "Product",
                products,
                "",
                this.handleSelectChange
              )}
            </div>
            <div className="col">
              {this.renderSelect("Brand", brands, "", this.handleSelectChange)}
            </div>

            <div className="col">
              {this.renderSelect("Model", models, "", this.handleSelectChange)}
            </div>
            <div className="col">
              {this.renderSelect("Line", lines, "", this.handleSelectChange)}
            </div>
          </div>

          <div className="row pt-2">
            <div className="col">
              {this.renderInput(
                "from",
                "From",
                "",
                fields.from,
                this.handleInputChange,
                "",
                true,
                "date"
              )}
            </div>
            <div className="col">
              {this.renderInput(
                "to",
                "To",
                "",
                fields.to,
                this.handleInputChange,
                "",
                true,
                "date"
              )}
            </div>
            <div className="col">
              {this.renderSelect(
                "Filter",
                filters,
                "",
                this.handleFilterChange
              )}
            </div>
            <div className="col-2">
              <p className="mt-4"></p>
              {this.renderButton("Search")}
            </div>
            <div className="col-2">
              <p className="mt-4"></p>
              <CSVLink
                className="btn btn-block btn-success btn-lg w-100"
                data={excel}
              >
                Excel
              </CSVLink>
            </div>
          </div>
        </form>
        {isFiltered ? (
          <StaticsGroupedTable
            rows={excel}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
          />
        ) : (
          <StaticsTable
            rows={excel}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
          />
        )}
      </>
    );
  }
}

export default StaticsForm;
