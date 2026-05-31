import express from "express";
const router = express.Router();
import { getMe, getAllUsers, updateMe } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.get("/", protect, getAllUsers);

export default router;
