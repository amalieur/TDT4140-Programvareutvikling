import postController from '../controllers/postcontroller';
import categoryController from '../controllers/categoryController';
import userController from '../controllers/userController';
import express from 'express';

const router = express.Router();

// Endpoints
router.use("/post", postController);
router.use("/category", categoryController);
router.use("/user", userController);

export default router;