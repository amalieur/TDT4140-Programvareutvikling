import { Response, Request } from "express";
import query from '../../services/db_query';
import express from 'express';
import Category from '../../models/category';
import authenticateToken from '../../middlewares/auth';
import adminPermission from '../../middlewares/adminPermission';

const router = express.Router();
const category = new Category();
// routes Kategori
// - hente alle kategorier (get)
// SELECT * FROM category;
// - hente et bestemt kategori (get)
// SELECT * FROM category WHERE categoryid = #num;
// - remove specific cateogry (post)
// INSERT INTO `jonnynl_tdt4140`.`category` (`categoryid`, `name`) VALUES ('4', 'ad');
// - add category (post)
// DELETE FROM `jonnynl_tdt4140`.`category` WHERE (`categoryid` = '3');

/* ============================= CREATE ============================= */
// Create category `/api/category/`
router.route('/').post(authenticateToken, adminPermission, async (request: Request, response: Response) => {
	const {name} = request.body;
	try {
		const input = (` INSERT INTO category(name) VALUES (?);`)
		return response.status(200).json(
            await query(input, [name])
        );
	} catch (error) {
		return response.status(400).send("Bad Request");
	}
});

/* ============================= READ ============================= */
// Get category `/api/category/`
router.route('/').get(async (_: Request, response: Response) => {
	try {
		response.status(200).json(await query("SELECT * FROM category;",""));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

// Get category from id `/api/category/:categoryid`
router.route('/:categoryid').get(async (request: Request, response: Response) => {
    const categoryid = request.params.categoryid;
	try {
		response.status(200).json(await query("SELECT * FROM category WHERE categoryid = ?",[categoryid]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

/* ============================= UPDATE ============================= */
router.route('/').put(authenticateToken, adminPermission, async (request: Request, response: Response) => {
    const categoryid = request.params.categoryid;
	const {categoryName} = request.body;
	try {
		response.status(200).json(await query("UPDATE category SET name=? WHERE categoryid=?;", [categoryName, categoryid]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

/* ============================= DELETE ============================= */
// remove category with id `/api/category/#categoryid`
router.route('/').delete(authenticateToken, adminPermission, async (request: Request, response: Response) => {
    const categoryid = request.params.categoryid;
	try {
		response.status(200).json(await query("DELETE FROM category WHERE categoryid = ?",[categoryid]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

export default router;