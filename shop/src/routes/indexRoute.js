import express from "express";
const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("home", { title: "Trang chủ", layout: "layouts/main" });
});

router.get("/intro", function (req, res, next) {
    res.render("intro", {
        title: "Giới thiệu",
        layout: "layouts/main",
    });
});

router.get("/contact", function (req, res, next) {
    res.render("contact", {
        title: "Liên hệ",
        layout: "layouts/main",
    });
});

export default router;
