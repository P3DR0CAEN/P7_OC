const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const auth = require("../middleware/auth");

const multerMiddleware = require("../middleware/multer-traitement");

const postCreate = require("../controllers/post/post.create");
const postDelete = require("../controllers/post/post.delete");
const postGetAll = require("../controllers/post/post.get.all");
const postLike = require("../controllers/post/post.like");
const postShare = require("../controllers/post/post.share");

router.post(
    "/create",
    auth,
    multerMiddleware("posts"),
    asyncHandler(postCreate)
);
router.post("/delete/:id", auth, asyncHandler(postDelete));
router.get("/get", auth, asyncHandler(postGetAll));
router.post("/like/:id", auth, asyncHandler(postLike));
router.post("/share/:id", auth, asyncHandler(postShare));

module.exports = router;
