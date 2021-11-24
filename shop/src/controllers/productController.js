import _ from "lodash";
import productService from "../services/productService";

const productControllers = {
  async allProducts(req, res) {
    const perPage = 9;
    const { page = 1 } = req.query;
    const { data, total } = await productService.getProducts({
      page,
      perPage,
    });
    console.log(data);
    const state = {
      title: "Tất cả sản phẩm",
      page,
      perPage,
      data,
      layout: "layouts/main",
    };
    res.render("product/tat-ca-san-pham", {
      ...state,
    });
  },
  async productDetail(req, res) {
    const perPage = 9;
    const { id } = req.params;

    const { data } = await productService.getProductById({ id });
    console.log(data);
    const state = {
      title: data.name,
      data,
      layout: "layouts/main",
    };
    res.render("product/product-detail", {
      ...state,
    });
  },
};

export default productControllers;
