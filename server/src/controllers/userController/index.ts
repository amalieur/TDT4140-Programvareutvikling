import { Response, Request } from "express";
import query from '../../services/db_query';
import express from 'express';
import IUser from '../../models/user';
import authenticateToken from '../../middlewares/auth';

const router = express.Router();
/* ============================= CREATE ============================= */
// Create an user `/api/user/`
router.route('/').post(async (request: Request, response: Response) => {
	const {username, email, password, isAdmin, location, firstName, lastName, mobileNo, create_time} = request.body; // destructuring
	try {
		const user: IUser = {
			"username": username,
			"email": email,
            "password": password,
			"isAdmin": isAdmin || 0,
			"location": location || null,
			"firstName": firstName,
			"lastName": lastName,
			"mobileNo": mobileNo
		};
		if (Object.values(user).filter(p => p == undefined).length > 0) return response.status(500).send("Error");
		const input = (`INSERT INTO user(username, email, password, isAdmin, location, firstName, lastName, mobileNo) VALUES (?,?,?,?,?,?,?,?)`);
		return response.status(200).json(
			await query(input, Object.values(user))
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
router.route('/:userId').get(async (request: Request, response: Response) => {
	const userId = request.params.userId;
	try {
		const input = `SELECT userId, username, email, create_time, location, firstName, lastName, mobileNo FROM user WHERE userId=?;`
		response.status(200).json(await query(input,[userId]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

/* ============================= UPDATE ============================= */
// Update user from id `/api/user/:userId`
router.route('/:userId').put(async (request: Request, response: Response) => {
	const userId = parseInt(request.params.userId);
	const {username, email, password, location, firstName, lastName, mobileNo} = request.body;
	try {
		const input = `UPDATE user SET username=?, email=?, password=?, location=?, firstName=?, lastName=?, mobileNo=? WHERE userId=?;`;
		response.status(200).json(await query(input,[username, email, password, location, firstName, lastName, mobileNo, userId]));
	} catch (error) {
		console.error(error);
		response.status(400).send("Bad Request");
	}
});

/* ============================= DELETE ============================= */
// Delete user from id `/api/user/:id`
router.route('/:userId').delete(authenticateToken, async (request: Request, response: Response) => {
	const userId = request.params.userId;
	try {
		const input = `DELETE FROM user WHERE (userId=?);`;
		response.status(200).json(await query(input,[userId]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

export default router;
