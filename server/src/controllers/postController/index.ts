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

/* ============================= READ ============================= */
// Get all posts `/api/post/?categoryid=:categoryid&userId=:userId&sort=:sort&min_price=:min_price&max_price=:max_price`
router.route("/").get(async (request: Request, response: Response) => {
  let { categoryid, userId, sort, min_price, max_price } = request.query as { [key: string]: string };
  try {
    let input = `SELECT p.id, p.title, p.description, p.price, p.timestamp, p.owner, p.categoryid, p.imageUrl 
    FROM post as p`;

    if (categoryid == "undefined" || categoryid == "0") {
      categoryid = "";
    }

    if (categoryid || userId || min_price || max_price) input += ` WHERE `;
    const params = Object.entries({
      categoryId: categoryid,
      owner: userId
    }).filter((param) => param[1])
    // Add p.categoryId = ? AND p.userId = ? respectively if it is not undefined
    
    input += params.map((param) => `p.${param[0]} = ?`).join(" AND ")

    // Filters posts by price
    if (min_price) {
      if (categoryid) {
        input += ` AND`;
      }
      input += ` p.price >= ${min_price}`
    }
    if (max_price) {
      input += ` AND p.price <= ${max_price}`
    }

    // Sorts posts
    if (sort && sort != "0") {
      switch(sort){
        case "1":
          input += " ORDER BY p.price ASC"
          break;
        case "2":
          input += " ORDER BY p.price DESC"
          break;
        case "3":
          input += " ORDER BY p.title ASC"
          break;
        case "4":
          input += " ORDER BY p.title DESC"
          break;
        case "5":
          input += " ORDER BY p.timestamp DESC"
          break;
        case "6":
          input += " ORDER BY p.timestamp ASC"
          break;
      }
    }

    response.status(200).json(await query(input, params.map((param) => param[1])));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

// Get max post price of category `/api/post/max?categoryid=:categoryid`
router.route("/max").get(async (request: Request, response: Response) => {
  const { categoryid } = request.query as { [key: string]: string };
  try {
    let input = `SELECT MAX(p.price) as maxPrice FROM post as p `;

    if (categoryid && categoryid != "undefined" && categoryid != "0") {
      input += `WHERE p.categoryid=?`;
    }

    response.status(200).json(await query(input, [categoryid]));
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

export default router;