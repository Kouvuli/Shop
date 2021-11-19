const express = require("express");
const router = express.Router();

router.get("/tat-ca-san-pham", function (req, res, next) {
  res.render("category/tat-ca-san-pham", {
    layout: "layouts/main",
  });
});
router.get("/may-nghe-nhac", function (req, res, next) {
  res.render("category/may-nghe-nhac", {
    layout: "layouts/main",
  });
});
router.get("/loa", function (req, res, next) {
  res.render("category/loa", {
    layout: "layouts/main",
  });
});
router.get("/microphone", function (req, res, next) {
  res.render("category/microphone", {
    layout: "layouts/main",
  });
});
router.get("/tai-nghe", function (req, res, next) {
  res.render("category/tai-nghe", {
    layout: "layouts/main",
  });
});

export default router;
