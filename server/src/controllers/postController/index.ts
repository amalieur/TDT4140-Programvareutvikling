import { Response, Request } from "express";
import query from "../../services/db_query";
import express from "express";
import IPost from "../../models/post";
import IReview from "../../models/review";
import Category from "../../models/category";
import authenticateToken from '../../middlewares/auth';

const router = express.Router();
const category = new Category();

/* ============================= CREATE ============================= */
// Create posts `/api/post/`
router.route("/").post(async (request: Request, response: Response) => {
  const {
    title,
    description,
    price,
    timestamp,
    owner,
    categoryid,
    imageUrl,
    status,
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
      status: status,
    };

    if (Object.values(post).filter((p) => p == undefined).length > 0)
      return response.status(500).send("Error");
    const input = `INSERT INTO post(title, description, price, timestamp, owner, categoryid, imageUrl, status) VALUES (?,?,?,?,?,?,?,?)`;
    return response.status(200).json(await query(input, Object.values(post)));
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
});

// Contact post with body id and userId`/api/post/contact/`
router.route("/contact").post(authenticateToken, async (request: Request, response: Response) => {
  const {id, userId} = request.body;
  if (!(id && userId)) return response.status(400).send("Bad Request");
  try {
    // Check for duplicates
    const duplicate_input = "SELECT * FROM postContacted WHERE id=? AND userId=?;"
    const contact = await query(duplicate_input,[id, userId]);
    const contactObj = Object.values(JSON.parse(JSON.stringify(contact.data)))[0];
    if (contactObj) {
        return response.status(200);
    }
    // If there is no duplicates, create new relation
    return response
      .status(200)
      .json(await query("INSERT INTO postContacted (id, userId) VALUES (?, ?)", [id, userId]));
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
});

// Review post with body id, userId, stars and comment`/api/post/review/`
router.route("/review").post(authenticateToken, async (request: Request, response: Response) => {
  const {id, userId, stars, comment} = request.body;
  if (!(id && userId)) return response.status(400).send("Bad Request");
  try {
    // Check for duplicates
    const duplicate_input = "SELECT * FROM postReview WHERE id=? AND userId=?;"
    const review = await query(duplicate_input,[id, userId]);
    const reviewObj = Object.values(JSON.parse(JSON.stringify(review.data)))[0];
    if (reviewObj) {
        return response.status(200);
    }
    // If there is no duplicates, create new relation
    return response
      .status(200)
      .json(await query("INSERT INTO postReview (id, userId, stars, comment) VALUES (?, ?, ?, ?)", [id, userId, stars, comment]));
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
});

/* ============================= READ ============================= */
// Get all posts `/api/post/?categoryid=:categoryid&userId=:userId`
router.route("/").get(async (request: Request, response: Response) => {
  const { categoryid, userId } = request.query as { [key: string]: string };
  try {
    let input = `SELECT p.id, p.title, p.description, p.price, p.timestamp, p.owner, p.categoryid, p.imageUrl, p.status 
    FROM post as p`;
    if (categoryid || userId) input += ` WHERE `;
    const params = Object.entries({
      categoryId: categoryid,
      owner: userId
    }).filter((param) => param[1])
    // Add p.categoryId = ? AND p.owner = ? respectively if it is not undefined
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
    const input = `SELECT p.id, p.title, p.description, p.price, p.timestamp, p.owner, p.categoryid, p.imageUrl, p.status 
		FROM post as p
    WHERE p.id=?;`;
    response.status(200).json(await query(input, [postId]));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

// Get users relating to contact post with params postId: `/api/post/contact/:id`
router.route("/contact/:id").get(authenticateToken, async (request: Request, response: Response) => {
  const postId: string = request.params.id as string;
  if (!postId) return response.status(400).send("Bad Request");
  try {
    return response
      .status(200)
      .json(await query("SELECT U.userId, U.username, U.email, U.password, U.create_time, U.isAdmin FROM postContacted as PC INNER JOIN user as U ON PC.userId = U.userId WHERE PC.id= ?", [postId]));
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
});

// Get user given reviews with params postId: `/api/post/review/given/:id`
router.route("/review/given/:id").get(authenticateToken, async (request: Request, response: Response) => {
  const userId: string = request.params.id as string;
  if (!userId) return response.status(400).send("Bad Request");
  try {
    return response
      .status(200)
      .json(await query("SELECT * FROM postReview WHERE userId = ?;", [userId]));
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
});

// Get user received reviews with params postId: `/api/post/review/received/:id`
router.route("/review/received/:id").get(authenticateToken, async (request: Request, response: Response) => {
  const userId: string = request.params.id as string;
  if (!userId) return response.status(400).send("Bad Request");
  try {
    return response
      .status(200)
      .json(await query("SELECT PR.id, PR.userId, PR.stars, PR.comment FROM postReview as PR INNER JOIN post as P ON P.id = PR.id where P.owner = ?;", [userId]));
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
});

/* ============================= UPDATE ============================= */
// Edit review with id `/api/review/`
router.route("/review").put(authenticateToken, async (request: Request, response: Response) => {
  const {
    id,
    userId,
    stars,
    comment,
  } = request.body;
  try {
    const review: IReview = {
      id: id,
      userId: userId,
      stars: stars,
      comment: comment
    };
    response
      .status(200)
      .json(await query("UPDATE postReview SET stars = ?, comment = ? WHERE (id = ?) and (userId = ?);", [stars, comment, id, userId]));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

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
    status,
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
      status: status,
    };

    response
      .status(200)
      .json(await query("UPDATE post SET title=?, description=?, price=?, timestamp=?, categoryid=?, imageUrl=?, status=? WHERE id=?;", [title, description, price, timestamp, categoryid, imageUrl, status, postId]));
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