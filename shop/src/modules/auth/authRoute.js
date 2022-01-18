import express from "express";
import passport from "passport";
import authController from "./authController";
const router = express.Router();

router.get("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/active/:token", authController.active);

router.get("/forgot-password", authController.forgot);
router.post("/forgot-password", authController.sendEmail);
router.get("/change-password", authController.changePassword);
router.post("/change-password", authController.handler);

router.post("/register", authController.register);
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/?success=true",
        failureRedirect: "/auth/login?wrong=true",
        failureFlash: false,
    })
);
export default router;
