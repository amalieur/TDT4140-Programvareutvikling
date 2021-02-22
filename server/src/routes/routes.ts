import postController from '../controllers/postController';
import categoryController from '../controllers/categoryController';
import userController from '../controllers/userController';
import authController from '../controllers/authController';
import express from 'express';

const router = express.Router();

// Endpoints
router.use("/post", postController);
router.use("/category", categoryController);
router.use("/user", userController);
router.use("/auth", authController);

export default router;