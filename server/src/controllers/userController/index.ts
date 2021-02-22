import { Response, Request } from "express";
import query from '../../services/db_query';
import express from 'express';
import IUser from '../../models/user';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import authenticateToken from '../../middlewares/auth';

const router = express.Router();
/* ============================= CREATE ============================= */
// Get all users `/api/user/`
router.route('/').post(async (request: Request, response: Response) => {
	const {username, email, password, create_time} = request.body;
	try {
		const user: IUser = {
			"username": username,
			"email": email,
            "password": password,
		};
		if (Object.values(user).filter(p => p == undefined).length > 0) return response.status(500).send("Error");
		const input = (`INSERT INTO user(username, email, password) VALUES (?,?,?)`)
		return response.status(200).json(
			await query(input,Object.values(user))
		);
	} catch (error) {
		return response.status(400).send("Bad Request");
	}
});
/* ============================= READ ============================= */
// Get all users `/api/user/`
router.route('/').get(async (_: Request, response: Response) => {
	try {
		const input = "SELECT userId, username, email, create_time FROM user;"
		response.status(200).json(await query(input,""));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

// Get user with id `/api/user/:id`
router.route('/:userId').get(authenticateToken, async (request: Request, response: Response) => {
	const userId = request.params.userId;
	try {
		const input = `SELECT userId, username, email, create_time FROM user WHERE userId=?;`
		response.status(200).json(await query(input,[userId]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

// Get user with username and password `/api/user/`
router.route('/login').post(async (request: Request, response: Response) => {
	const {username, password} = request.body;
	try {
		const input = "SELECT userId, username, email, create_time FROM user WHERE username=? AND password=?;"
		const user = await query(input,[username, password]);
		// Check if an user object is retrieved
		const userObj = Object.values(JSON.parse(JSON.stringify(user.data)))[0];
		if (userObj) {
			const jwt_token = jwt.sign({data: user.data}, config.JWT_KEY.replace(/\\n/gm, '\n'), {
				algorithm: 'RS256',
				expiresIn: 3600*24, // 24 hours
			});
			response.status(200).json({
				token: jwt_token,
			});
		} else {
			response.status(403).send("Invalid combination of username and password given!");
		}
	} catch (error) {
		response.status(400).send("Bad Request");
		console.log(error);
	}
});

/* ============================= UPDATE ============================= */
// Update user from id `/api/user/:id`
router.route('/:userId').put(async (request: Request, response: Response) => {
	const userId = request.params.userId;
	const {username, email, password} = request.body;
	try {
		const input = `UPDATE user SET username=?, email=?, password=? WHERE userId=?);`;
		response.status(200).json(await query(input,[username, email, password, userId]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

/* ============================= DELETE ============================= */
// Delete user from id `/api/user/:id`
router.route('/:userId').delete(async (request: Request, response: Response) => {
	const userId = request.params.userId;
	try {
		const input = `DELETE FROM user WHERE (userId=?);`;
		response.status(200).json(await query(input,[userId]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

export default router;

