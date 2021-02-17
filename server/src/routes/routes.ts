import postController from '../controllers/postcontroller';
import categoryController from '../controllers/categoryController';
import express from 'express';

const router = express.Router();

// Endpoints
router.use("/post", postController);
router.use("/category", categoryController);


export default router;
