const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("auth/dang-nhap", { title: "Express", layout: "layouts/login" });
});

export default router;
