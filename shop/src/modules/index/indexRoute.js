import express from "express";
const router = express.Router();

router.get("/", function (req, res, next) {

    res.render("home", { title: "Trang chủ" });
});

router.get("/intro", function (req, res, next) {
    res.render("intro", {
        title: "Giới thiệu",

    });
});

router.get("/contact", function (req, res, next) {
    res.render("contact", {
        title: "Liên hệ",

    });
});
router.get("/chinh-sach-bao-mat", function (req, res, next) {
    res.render("chinh-sach-bao-mat", {
        title: "Express",

    });
});

router.get("/chinh-sach-doi-tra-hoan-tien", function (req, res, next) {
    res.render("chinh-sach-doi-tra-hoan-tien", {
        title: "Express",

    });
});

router.get("/chinh-sach-khach-si", function (req, res, next) {
    res.render("chinh-sach-khach-si", {
        title: "Express",

    });
});

router.get("/dieu-khoan-dich-vu", function (req, res, next) {
    res.render("dieu-khoan-dich-vu", {
        title: "Express",

    });
});

router.get("/phuong-thuc-van-chuyen", function (req, res, next) {
    res.render("phuong-thuc-van-chuyen", {
        title: "Express",

    });
});

router.get("/thoi-gian-lam-viec", function (req, res, next) {
    res.render("thoi-gian-lam-viec", {
        title: "Express",

    });
});

export default router;
