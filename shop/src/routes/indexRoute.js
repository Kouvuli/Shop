const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("trang-chu", { title: "Trang chủ", layout: "layouts/main" });
});

router.get("/gioi-thieu", function (req, res, next) {
  res.render("gioi-thieu", {
    title: "Giới thiệu",
    layout: "layouts/main",
  });
});

router.get("/lien-he", function (req, res, next) {
  res.render("lien-he", {
    title: "Liên hệ",
    layout: "layouts/main",
  });
});

export default router;
