import express from "express";
import categoryController from "../controllers/categoryController";

const router = express.Router();

router.get("/may-nghe-nhac", categoryController.playerProducts);
router.get("/loa", categoryController.speakerProducts);
router.get("/microphone", categoryController.microphoneProducts);
router.get("/tai-nghe", categoryController.headphoneProducts);

export default router;
