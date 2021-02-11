//import { example1, example2 } from '../controllers/example';
import postController from '../controllers/postController'
import express from 'express';

const router = express.Router();

// Endpoints
router.use("/post", postController); 


export default router;
