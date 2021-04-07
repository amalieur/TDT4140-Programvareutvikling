import { Response, Request } from "express";
import query from "../../services/db_query";
import express from "express";
import IPost from "../../models/post";
import Category from "../../models/category";
import authenticateToken from '../../middlewares/auth';

const router = express.Router();
const category = new Category();

/* ============================= CREATE ============================= */
// Create posts `/api/post/`
//'{"title":"test3","description":"test3","timestamp":123123,"owner":"test3","category":"test3","imageUrl":"test3"}'
router.route("/").post(async (request: Request, response: Response) => {
  const {
    title,
    description,
    price,
    timestamp,
    owner,
    categoryid,
    imageUrl,
  } = request.body;
  try {
    const post: IPost = {
      title: title,
      description: description,
      price: price,
      timestamp: timestamp,
      owner: owner,
      categoryid: categoryid,
      imageUrl: imageUrl,
    };

    if (Object.values(post).filter((p) => p == undefined).length > 0)
      return response.status(500).send("Error");
    const input = `INSERT INTO post(title, description, price, timestamp, owner, categoryid, imageUrl) VALUES (?,?,?,?,?,?,?)`;
    return response.status(200).json(await query(input, Object.values(post)));
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
});

// Add favourite post by id and userId `/api/post/favourite/`
router.route("/favourite").post(authenticateToken, async (request: Request, response: Response) => {
  const {id, userId} = request.body;
  try {
    if (id == undefined || userId == undefined) return response.status(500).send("Error");
        // Check for user duplicates
        const duplicate_input = "SELECT * FROM postFavourite WHERE id=? AND userId=?;"
        const user = await query(duplicate_input,[id, userId]);
        const retrievedUserObj = Object.values(JSON.parse(JSON.stringify(user.data)))[0];
		if (retrievedUserObj) {
        return response.status(403).send("Already favourited!");
    }
    const input = `INSERT INTO postFavourite (id, userId) VALUES (?, ?);`;
    response.status(200).json(await query(input, [id, userId]));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

/* ============================= READ ============================= */
// Get all posts `/api/post/?categoryid=:categoryid&userId=:userId`
router.route("/").get(async (request: Request, response: Response) => {
  const { categoryid, userId } = request.query as { [key: string]: string };
  try {
    let input = `SELECT p.id, p.title, p.description, p.price, p.timestamp, p.owner, p.categoryid, p.imageUrl 
    FROM post as p`;
    if (categoryid || userId) input += ` WHERE `;
    const params = Object.entries({
      categoryId: categoryid,
      owner: userId
    }).filter((param) => param[1])
    // Add p.categoryId = ? AND p.userId = ? respectively if it is not undefined
    input += params.map((param) => `p.${param[0]} = ?`).join(" AND ")
    console.log(input, params.map((param) => param[1]));
    response.status(200).json(await query(input, params.map((param) => param[1])));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

// Get post with id `/api/post/:id`
router.route("/:id").get(async (request: Request, response: Response) => {
  const postId: string = request.params.id as string;
  try {
    const input = `SELECT p.id, p.title, p.description, p.price, p.timestamp, p.owner, p.categoryid, p.imageUrl 
		FROM post as p
    WHERE p.id=?;`;
    response.status(200).json(await query(input, [postId]));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

// Get status of post is favoritted by id `/api/post/favourite/:id/:userId`
router.route("/favourite/:id/:userId").get(authenticateToken, async (request: Request, response: Response) => {
  const id: string = request.params.id as string;
  const userId: string = request.params.userId as string;
  try {
    if (id == undefined || userId == undefined) return response.status(500).send("Error");
    const input = `SELECT COUNT(*) as favourited FROM postFavourite WHERE id = ? AND userId = ?;`;
    response.status(200).json(await query(input, [parseInt(id), parseInt(userId)]));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

// Get favourited post of userid `/api/post/favourite/:userId`
router.route("/favourite/:userId").get(authenticateToken, async (request: Request, response: Response) => {
  const userId: string = request.params.userId as string;
  try {
    if (userId == undefined) return response.status(500).send("Error");
    const input = `SELECT P.id, P.title, P.description, P.price, P.timestamp, P.owner, P.categoryId, P.imageUrl, P.status FROM postFavourite as PF INNER JOIN post as P ON P.id = PF.id WHERE PF.userId = ?;`;
    response.status(200).json(await query(input, [parseInt(userId)]));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

/* ============================= UPDATE ============================= */
// Edit post with id `/api/post/:id`
router.route("/:id").put(authenticateToken, async (request: Request, response: Response) => {
  const postId: string = request.params.id as string;
  const {
    title,
    description,
    price,
    timestamp,
    owner,
    categoryid,
    imageUrl,
  } = request.body;
  try {
    const post: IPost = {
      title: title,
      description: description,
      price: price,
      timestamp: timestamp,
      owner: owner,
      categoryid: categoryid,
      imageUrl: imageUrl,
    };

    response
      .status(200)
      .json(await query("UPDATE post SET title=?, description=?, price=?, timestamp=?, categoryid=?, imageUrl=? WHERE id=?;", [title, description, price, timestamp, categoryid, imageUrl, postId]));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

/* ============================= DELETE ============================= */
// Remove post with id `/api/post/:id`
router.route("/:id").delete(authenticateToken, async (request: Request, response: Response) => {
  const postId: string = request.params.id as string;
  try {
    response
      .status(200)
      .json(await query("DELETE FROM post WHERE id=?;", [postId]));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

// Remove favourites with id and userId `/api/post/favourite/:id/:userId`
router.route("/favourite/:id/:userId").delete(authenticateToken, async (request: Request, response: Response) => {
  const id: string = request.params.id as string;
  const userId: string = request.params.userId as string;
  try {
    if (id == undefined || userId == undefined) return response.status(500).send("Error");
    response
      .status(200)
      .json(await query("DELETE FROM postFavourite WHERE id=? AND userId=?;", [parseInt(id), parseInt(userId)]));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});
export default router;