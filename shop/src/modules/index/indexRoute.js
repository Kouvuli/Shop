import express from "express";
import cartService from "../../services/cartService";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const userId = req.user;
  if (!!req.session.cartId && !!userId) {
    const cartId = req.session.cartId;
    await cartService.setUserIdByCartId({ userId, cartId });
    req.session.cartId = "";
  }
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
router.get("/privacy-policy", function (req, res, next) {
  res.render("shop/privacy-policy", {
    title: "Chính sách bảo mật",
  });
});

router.get("/exchange-refund-policy", function (req, res, next) {
  res.render("shop/exchange-refund-policy", {
    title: "Chính sách đổi trả",
  });
});

router.get("/wholesale-customer-policy", function (req, res, next) {
  res.render("shop/wholesale-customer-policy", {
    title: "Chính sách khách sỉ",
  });
});

router.get("/terms-of-service", function (req, res, next) {
  res.render("shop/terms-of-service", {
    title: "Điều khoản dịch vụ",
  });
});

router.get("/shipping-method", function (req, res, next) {
  res.render("shop/shipping-method", {
    title: "Phương thức vận chuyển",
  });
});

router.get("/working-time", function (req, res, next) {
  res.render("shop/working-time", {
    title: "Thời gian làm việc",
  });
});

export default router;
