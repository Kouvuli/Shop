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
      perPage: Math.min(perPage, data.length),
      data,
      total,
      layout: "layouts/main",
    };
    if (_.isEmpty(req.body)) {
      res.render("product/tat-ca-san-pham", {
        ...state,
        pagination: {
          page,
          limit: Math.ceil(total / perPage),
          perPage: perPage,
        },
      });
    }
  },
  async productDetail(req, res) {
    const { id } = req.params;
    const data = await productService.getProductById({ id });
    const state = {
      title: data.name,
      data,
      image1: data.images[0],
      layout: "layouts/main",
    };
    if (_.isEmpty(req.body)) {
      res.render("product/product-detail", {
        ...state,
      });
    }
  },
};

export default productControllers;
