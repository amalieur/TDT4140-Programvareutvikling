import { Response, Request } from "express";
import query from "../../services/db_query";
import express from "express";
import IPost from "../../models/post";
import IReview from "../../models/review";
import Category from "../../models/category";
import adminPermission from '../../middlewares/adminPermission';
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
      imageUrl: imageUrl
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
// Get all posts `/api/post/?categoryid=:categoryid&&userId=:userId&location=:location&sort=:sort&min_price=:min_price&max_price=:max_price`
router.route("/").get(async (request: Request, response: Response) => {
  let { categoryid, userId, location, sort, min_price, max_price } = request.query as { [key: string]: string };
  let locationFilter: any = undefined;
  try {
    let input = `SELECT p.id, p.title, p.description, p.price, p.timestamp, p.owner, p.categoryid, p.imageUrl, p.status 
    FROM post as p`;

    if (categoryid == "undefined" || categoryid == "0") {
      categoryid = "";
    }
    if (location && location != "undefined") {
      input += ` INNER JOIN user as u ON p.owner = u.userId`;
      locationFilter = JSON.parse(location);
    }
    if (categoryid || userId || location || min_price || max_price) input += ` WHERE `;
    const params = Object.entries({
      categoryId: categoryid,
      owner: userId,
      location: locationFilter
    }).filter((param) => param[1])
    // Add "p.categoryId = ? AND p.owner = ? AND (u.location = ? OR u.location = ? ...)" respectively if it is not undefined    
    input += params.map((param) => `${param[0] == "location" ? `(${param[1].map((_: string) => `u.location = ?`).join(" OR ")})` : `p.${param[0]} = ?`}`).join(" AND ");

    // Filters posts by price
    if (min_price && min_price != "undefined") {
      if (categoryid || userId || locationFilter) {
        input += ` AND`;
      }
      input += ` p.price >= ${min_price}`
    }
    if (max_price && max_price != "undefined") {
      input += ` AND p.price <= ${max_price}`
    }
    // Sorts posts
    if (sort && sort != "0" && sort != "undefined") {
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
    response.status(200).json(await query(input, params.flatMap((param: any) => param[1])));
  } catch (error) {
    response.status(400).send("Bad Request");
  }
});

// Get max post price of category `/api/post/max?categoryid=:categoryid`
router.route("/max").get(async (request: Request, response: Response) => {
  const { categoryid } = request.query as { [key: string]: string };
  try {
    let input = `SELECT MAX(p.price) as maxPrice FROM post as p WHERE p.status=0`;

    if (categoryid && categoryid != "undefined" && categoryid != "0") {
      input += ` AND p.categoryid=?`;
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
    const input = `SELECT p.id, p.title, p.description, p.price, p.timestamp, p.owner, p.categoryid, p.imageUrl, p.status 
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