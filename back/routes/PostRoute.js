const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const auth = require("../middleware/auth");

const multerMiddleware = require("../middleware/multer-traitement");

const postCreate = require("../controllers/post.create");
const postGetAll = require("../controllers/post.get.all");
const postGetUser = require("../controllers/post.get.user");
const postLike = require("../controllers/post.like");
const postShare = require("../controllers/post.share");

router.post("/create", auth, multerMiddleware, asyncHandler(postCreate));
router.post("/get", auth, asyncHandler(postGetAll));
router.get("/get/:id", auth, asyncHandler(postGetUser));
router.put("/like/:id", auth, asyncHandler(postLike));
router.put("/share/:id", auth, asyncHandler(postShare));

module.exports = router;
