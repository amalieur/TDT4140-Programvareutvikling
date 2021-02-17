import { Response, Request } from "express";
import query from '../../services/db_query';
import express from 'express';
import IPost from '../../models/post';
import Category from '../../models/category';

const router = express.Router();
const category = new Category();

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
		//response.status(200).json(await query("SELECT * FROM post;",""));
		const input = `SELECT p.id, p.title, p.description, p.timestamp, p.owner, category.name, p.imageUrl 
		FROM post as p
		INNER JOIN category ON category.categoryid = p.categoryid;`
		response.status(200).json(await query(input,""));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

// Get post with id `/api/post/:id`
router.route('/:id').get(async (request: Request, response: Response) => {
	const postId = request.params.id;
	try {
		//response.status(200).json(await query("SELECT * FROM post WHERE id=?;",[postId]));
		const input = `SELECT p.id, p.title, p.description, p.timestamp, p.owner, category.name, p.imageUrl 
		FROM post as p
		INNER JOIN category ON category.categoryid = p.categoryid WHERE p.id=?;`
		response.status(200).json(await query(input,[postId]));
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
