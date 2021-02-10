//import { example1, example2 } from '../controllers/example';
import postController from '../controllers/postController'
import express from 'express';

const router = express.Router();

// routes go brrrrr!
//router.get("/example1", example1);
//router.get("/example1/example2", example2);

// Endpoints
router.use("/post", postController); 


export default router;
