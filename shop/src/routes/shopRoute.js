import express from "express";
const router = express.Router();

router.get("/chinh-sach-bao-mat", function (req, res, next) {
  res.render("chinh-sach-bao-mat", {
    title: "Express",
    layout: "layouts/main",
  });
});

router.get("/chinh-sach-doi-tra-hoan-tien", function (req, res, next) {
  res.render("chinh-sach-doi-tra-hoan-tien", {
    title: "Express",
    layout: "layouts/main",
  });
});

router.get("/chinh-sach-khach-si", function (req, res, next) {
  res.render("chinh-sach-khach-si", {
    title: "Express",
    layout: "layouts/main",
  });
});

router.get("/dieu-khoan-dich-vu", function (req, res, next) {
  res.render("dieu-khoan-dich-vu", {
    title: "Express",
    layout: "layouts/main",
  });
});

router.get("/phuong-thuc-van-chuyen", function (req, res, next) {
  res.render("phuong-thuc-van-chuyen", {
    title: "Express",
    layout: "layouts/main",
  });
});

router.get("/thoi-gian-lam-viec", function (req, res, next) {
  res.render("thoi-gian-lam-viec", {
    title: "Express",
    layout: "layouts/main",
  });
});

export default router;
