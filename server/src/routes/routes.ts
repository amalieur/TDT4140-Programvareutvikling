import { example1, example2 } from '../controllers/example';
import express from 'express';

const router = express.Router();

router.get("/", (_, res) => {
	res.send("Hello world!");
});
router.get('/test', (req, res) => {
	console.log(req,res);
	res.send("test!");
});

// routes go brrrrr!
router.get("/example1", example1);
router.get("/example1/example2", example2);

export default router;
