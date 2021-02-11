import { Response, Request } from "express";
import query from '../services/db_query';
import express from 'express';
const router = express.Router();

interface IPost {
	title: string;
	description: string;
	timestamp: number;
	owner: string;
	category: string;
	imageUrl: string;
}
/* ============================= CREATE ============================= */
// Create posts `/api/post/`
//'{"title":"test3","description":"test3","timestamp":123123,"owner":"test3","category":"test3","imageUrl":"test3"}'
router.route('/').post(async (request: Request, response: Response) => {
	const {title, description, timestamp, owner, category, imageUrl} = request.body;
	try {
		const post: IPost = {
			"title": title,
			"description": description,
			"timestamp": timestamp,
			"owner": owner,
			"category": category,
			"imageUrl": imageUrl
		};
		if (Object.values(post).filter(p => p == undefined).length > 0) return response.status(500).send("Error");
		const input = (`INSERT INTO post(title, description, timestamp, owner, category, imageUrl) VALUES (?,?,?,?,?,?)`)
		return response.status(200).json(
			await query(input,Object.values(post))
		);
	} catch (error) {
		return response.status(400).send("Bad Request");
	}
});

/* ============================= READ ============================= */
// Get all posts `/api/post/`
router.route('/').get(async (_: Request, response: Response) => {
	try {
		response.status(200).json(await query("SELECT * FROM post;",""));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

// Get post with id `/api/post/:id`
router.route('/:id').get(async (request: Request, response: Response) => {
	const postId = request.params.id;
	try {
		response.status(200).json(await query("SELECT * FROM post WHERE id=?;",[postId]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

/* ============================= UPDATE ============================= */
// Edit post with id `/api/post/:id`
router.route('/:id').put(async (request: Request, response: Response) => {
	const postId = request.params.id;
	try {
		response.status(200).json(await query("SELECT * FROM post WHERE id=?;",[postId]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

/* ============================= DELETE ============================= */
// Remove post with id `/api/post/:id`
router.route('/:id').delete(async (request: Request, response: Response) => {
	const postId = request.params.id;
	try {
		response.status(200).json(await query("SELECT * FROM post WHERE id=?;",[postId]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

export default router;
