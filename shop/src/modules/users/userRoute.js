import express from "express";
import userControllers from "./userController";
import { authRedirect } from "../../middleware/auth";
const router = express.Router();

router.get("/profile", userControllers.profile);

router.get("/cart", userControllers.cart);
router.get("/payCart", authRedirect("payment"), userControllers.payCart);
router.get("/notifications", userControllers.notification);
router.get("/likes", userControllers.liked);
router.get("/logs", userControllers.logs);
router.post("/profile", userControllers.updateUser);
export default router;
