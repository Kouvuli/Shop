const express = require("express");
const router = express.Router();

router.get("/ho-so-ca-nhan", function (rq, res, next) {
  res.render("user/ho-so-ca-nhan", {
    title: "Tài khoản",
    layout: "layouts/user",
  });
});

router.get("/gio-hang", function (rq, res, next) {
  res.render("user/gio-hang", { title: "Giỏ hàng", layout: "layouts/user" });
});
router.get("/thong-bao", function (rq, res, next) {
  res.render("user/thong-bao", { title: "Thông báo", layout: "layouts/user" });
});
router.get("/da-thich", function (rq, res, next) {
  res.render("user/da-thich", { title: "Đã thích", layout: "layouts/user" });
});

export default router;
