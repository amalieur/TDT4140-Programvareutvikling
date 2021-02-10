import { Response, Request } from "express";
import query from '../services/db_query';
import express from 'express';
const router = express.Router();

router.route('/sendPost').get(async (request: Request, response: Response) => {
	try {
		response.status(200).send("a");
		// response.status(200).json(await query("SELECT * FROM test;"));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

router.route('/editPost').get(async (request: Request, response: Response) => {
	try {
		response.status(200).send("a");
		//response.status(200).json(await example.getTest());
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

export default router;
