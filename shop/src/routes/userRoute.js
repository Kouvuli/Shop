import express from "express";
import userControllers from "../controllers/userController";
const router = express.Router();

router.get("/ho-so-ca-nhan", userControllers.profile);

router.get("/gio-hang", userControllers.cart);
router.get("/thong-bao", userControllers.notification);
router.get("/da-thich", userControllers.liked);

export default router;
