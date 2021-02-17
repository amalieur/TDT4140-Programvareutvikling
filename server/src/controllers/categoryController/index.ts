import { Response, Request } from "express";
import query from '../../services/db_query';
import express from 'express';
import Category from '../../models/category';

const router = express.Router();
const category = new Category();
// routes Kategori
// - hente alle kategorier (get)
// SELECT * FROM category;
// - hente et bestemt kategori (get)
// SELECT * FROM category WHERE categoryid = #num;
// - remove specific cateogry (post)
// INSERT INTO `jonnynl_tdt4140`.`category` (`categoryid`, `navn`) VALUES ('4', 'ad');
// - add category (post)
// DELETE FROM `jonnynl_tdt4140`.`category` WHERE (`categoryid` = '3');

/* ============================= CREATE ============================= */
// Create category `/api/category/`
router.route('/').post(async (request: Request, response: Response) => {
	const {category} = request.body;
	try {
		const input = (` INSERT INTO category(navn) VALUES (?);`)
		return response.status(200).json(
            await query(input,[category])
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

/* ============================= DELETE ============================= */
// remove category with id `/api/category/#categoryid`
router.route('/').delete(async (request: Request, response: Response) => {
    const categoryid = request.params.categoryid;
	try {
		response.status(200).json(await query("DELETE FROM category WHERE categoryid = ?",[categoryid]));
	} catch (error) {
		response.status(400).send("Bad Request");
	}
});

export default router;