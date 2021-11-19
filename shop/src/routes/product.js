const express = require("express");
const router = express.Router();

router.get("/product-detail", function (req, res, next) {
  res.render("product/product-detail", { layout: "layouts/main" });
});

export default router;
