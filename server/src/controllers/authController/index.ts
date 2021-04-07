import { Response, Request } from "express";
import query from '../../services/db_query';
import express from 'express';
import IUser from '../../models/user';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import { isNamedExportBindings } from "typescript";

const router = express.Router();

// Post register user `/api/auth/register`
router.route('/register').post(async (request: Request, response: Response) => {
	const {username, email, password, isAdmin, location, firstName, lastName, mobileNo, create_time} = request.body;
	try {
        // Check valid request data parameters
		const user_data: IUser = {
			"username": username,
			"email": email,
            "password": password,
			"isAdmin": isAdmin || 0,
			"location": location || null,
			"firstName": firstName,
			"lastName": lastName,
			"mobileNo": mobileNo
		};
		if (Object.values(user_data).filter(p => p == undefined).length > 0) return response.status(500).send("Error");
        // Check for user duplicates
        const duplicate_input = "SELECT userId, username, email, create_time, mobileNo, isAdmin FROM user WHERE username=? AND password=?;"
        const user = await query(duplicate_input,[user_data.username, user_data.password]);
        const retrievedUserObj = Object.values(JSON.parse(JSON.stringify(user.data)))[0];
		if (retrievedUserObj) {
            return response.status(403).send("There exists an user with the same username or emails given!");
        }
        // If there is no duplicates, create new user
		const input = (`INSERT INTO user(username, email, password, isAdmin, location, firstName, lastName, mobileNo) VALUES (?,?,?,?,?,?,?,?)`)
		return response.status(200).json(
			await query(input,Object.values(user_data))
		);
	} catch (error) {
		return response.status(400).send("Bad Request");
	}
});

// Post auth token with username and password `/api/auth/login`
router.route('/login').post(async (request: Request, response: Response) => {
	const {username, password} = request.body;
	try {
		const input = "SELECT userId, username, email, isAdmin, firstName, lastName, mobileNo, create_time, location FROM user WHERE username=? AND password=?;"
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
			return response.status(401).send("Invalid combination of username and password given!");
		}
	} catch (error) {
		return response.status(400).send("Bad Request");
		console.log(error);
	}
});

export default router;

