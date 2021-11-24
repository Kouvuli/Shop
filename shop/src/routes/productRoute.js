const express = require("express");

import productControllers from "../controllers/productController";
const router = express.Router();

router.get("/tat-ca-san-pham", productControllers.allProducts);
router.get("/product-detail", function (req, res, next) {
  res.render("product/product-detail", { layout: "layouts/main" });
});

export default router;
