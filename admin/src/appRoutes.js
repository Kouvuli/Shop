import express from "express";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("trang-chu", { title: "Express", layout: "layouts/main" });
});

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

router.get("/gioi-thieu", function (req, res, next) {
  res.render("gioi-thieu", {
    title: "Express",
    layout: "layouts/main",
  });
});

router.get("/lien-he", function (req, res, next) {
  res.render("lien-he", {
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

router.get("/category/tat-ca-san-pham", function (req, res, next) {
  res.render("category/tat-ca-san-pham", {
    layout: "layouts/main",
  });
});
router.get("/category/may-nghe-nhac", function (req, res, next) {
  res.render("category/may-nghe-nhac", {
    layout: "layouts/main",
  });
});
router.get("/category/loa", function (req, res, next) {
  res.render("category/loa", {
    layout: "layouts/main",
  });
});
router.get("/category/microphone", function (req, res, next) {
  res.render("category/microphone", {
    layout: "layouts/main",
  });
});
router.get("/category/tai-nghe", function (req, res, next) {
  res.render("category/tai-nghe", {
    layout: "layouts/main",
  });
});

export default router;
